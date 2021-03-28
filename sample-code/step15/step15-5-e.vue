<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  nextTick,
  toRefs,
  onUpdated,
} from '@vue/composition-api';
import { CalendarTimestamp, CalendarEvent } from 'vuetify';
import {
  parseDate,
  parseTimestamp,
} from 'vuetify/lib/components/VCalendar/util/timestamp';
import {
  CalendarEventDetail,
  NewCalendarEvent,
} from '@/store/calendar-event.model';
import { calendarEventStore, add, update } from '@/store/calendar-event';
import { sharedUserStore, getThemeColor } from '@/store/shared-user';
import { profileStore } from '@/store/profile/profile';

interface VCalendar {
  scrollToTime(time: string): void;
  prev(): void;
  next(): void;
}

export default defineComponent({
  props: {
    /**
     * 表示するカレンダーの種類（月/週/日）を指定します。
     */
    type: {
      type: String,
      required: true,
      validator: (value: string) => {
        return ['month', 'week', 'day'].includes(value);
      },
    },
  },
  setup(props, context) {
    const state = reactive({
      // カレンダーコンポーネントの参照
      calendar: null as VCalendar | null,
      // カレンダーの表示範囲（開始日付）です。
      start: null as CalendarTimestamp | null,
      // カレンダーの表示範囲（終了日付）です。
      end: null as CalendarTimestamp | null,
      // カレンダーを描画するかどうかを示す値です。
      visible: true,
      // カレンダー上でフォーカスする日付です。
      focus: '',
      // 本日の日付です。
      today: parseDate(new Date()).date,
      // カレンダーを共有しているユーザーです。
      sharedUsers: sharedUserStore.sharedUsers,
      // イベントメニューを表示するかどうかを示す値です。
      isOpenEventMenu: false,
      /**
       * イベントメニューをアクティブにする要素です。
       * 詳細は`v-menu`コンポーネントのドキュメントを参照してください。
       */
      menuActivatorElement: null as HTMLElement | null,
      // 選択したイベントです。
      selectedEvent: null as CalendarEvent | null,
      // イベント登録/編集ダイアログを表示するかどうかを示す値です。
      isOpenEventDialog: false,
      // 登録/更新対象の新しいイベントの情報です。
      newEvent: null as NewCalendarEvent | null,
      // イベント開始日付を選択する`v-date-picker`を表示するかどうかを示す値です。
      isOpenStartDatePicker: false,
      // `v-date-picker`コンポーネントで選択したイベント開始日付です。
      startDate: null as string | null,
      // イベント開始時刻を選択する`v-time-picker`コンポーネントを表示するかどうかを示す値です。
      isOpenStartTimePicker: false,
      // `v-time-picker`コンポーネントで選択したイベント開始時刻です。
      startTime: null as string | null,
      // イベント終了日付を選択する`v-date-picker`コンポーネントを表示するかどうかを示す値です。
      isOpenEndDatePicker: false,
      // `v-date-picker`コンポーネントで選択したイベント終了日付です。
      endDate: null as string | null,
      // イベント終了時刻を選択する`v-time-picker`コンポーネントを表示するかどうかを示す値です。
      isOpenEndTimePicker: false,
      // `v-time-picker`コンポーネントで選択したイベント終了時刻です。
      endTime: null as string | null,
      // カレンダー上部に表示する日付を取得します。
      title: computed((): string => {
        if (!state.start || !state.end) {
          return '';
        }

        if (props.type === 'week') {
          return state.start.month === state.end.month
            ? `${state.start.year}年 ${state.start.month}月`
            : `${state.start.year}年 ${state.start.month}月～${state.end.month}月`;
        }

        return `${state.start.year}年 ${state.start.month}月`;
      }),
      /**
       * カレンダーに表示するイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEvents: computed((): CalendarEventDetail[] => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return calendarEventStore.calendarEvents.filter(event =>
          displayUserIds.includes(event.userId),
        );
      }),
      // 終了時刻を表示用にフォーマットします。
      formatEndDateTime: computed((): string => {
        return !state.selectedEvent || !state.selectedEvent.end
          ? ''
          : `終了: ${state.selectedEvent.end}`;
      }),
      // イベント終了時刻の入力を無効にするかどうかを判定します。
      disabledEndTime: computed((): boolean => {
        return !state.endDate || !state.startTime;
      }),
    });

    /**
     * `onUpdated`ライフサイクルフックです。
     */
    onUpdated(() => {
      if (props.type === 'month') {
        return;
      }
      nextTick(() => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.calendar!.scrollToTime('07:00');
      });
    });

    const methods = {
      // カレンダーを本日の日付に移動します。
      setToday: () => {
        state.focus = state.today;
      },
      // カレンダーを1つ前に戻します。
      prev: () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.calendar!.prev();
      },
      // カレンダーを1つ先に進めます。
      next: () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        state.calendar!.next();
      },
      // イベントの色を取得します。
      getEventColor: (event: CalendarEvent) => {
        if (!event) {
          return;
        }

        return getThemeColor(event.userId);
      },
      // カレンダーに表示する日のフォーマットを行います。
      formatDay: (timestamp: CalendarTimestamp) => {
        return new Date(timestamp.date).getDate();
      },
      // カレンダーに表示する月のフォーマットを行います。
      formatMonth: (timestamp: CalendarTimestamp) => {
        return `${new Date(timestamp.date).getMonth() + 1} /`;
      },
      // イベント詳細を表示します。
      showEvent: ({
        nativeEvent,
        event,
      }: {
        nativeEvent: Event;
        event: CalendarEvent;
      }) => {
        // 実装は https://vuetifyjs.com/ja/components/calendars/#イベント 参照。
        // setTimeoutを使用して遅延させないと、メニューを正しく表示できない。
        const open = () => {
          state.selectedEvent = event;
          state.menuActivatorElement = nativeEvent.target as HTMLInputElement;
          setTimeout(() => {
            state.isOpenEventMenu = true;
          }, 10);
        };

        if (state.isOpenEventMenu) {
          state.isOpenEventMenu = false;
          setTimeout(open, 10);
        } else {
          open();
        }

        // クリックイベントの伝搬を抑止します。
        nativeEvent.stopPropagation();
      },
      // カレンダー（日）を表示します。
      viewDay: ({ date }: { date: string }) => {
        state.focus = date;
        context.root.$router.push('/calendar/day');
      },
      // イベントの新規登録を開始します。
      startAddEvent: ({ date }: { date: string }) => {
        state.newEvent = {
          id: null,
          userId: null,
          name: null,
          start: date,
          end: null,
          memo: null,
          shared: true,
        };

        state.startDate = parseTimestamp(state.newEvent.start).date;
        state.isOpenEventDialog = true;

        // クリックイベントの伝搬を抑止します。
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        event!.stopPropagation();
      },
      /**
       * カレンダー上部の年月を表示するために使用する、表示範囲を更新します。
       * カレンダーが描画されたタイミング、または表示範囲が変更されたタイミングで呼び出されます。
       */
      updateRange: ({
        start,
        end,
      }: {
        start: CalendarTimestamp;
        end: CalendarTimestamp;
      }) => {
        state.start = start;
        state.end = end;
      },
      // 自分のイベントではないことを判定します。
      isNotOwner: (userId: string) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return userId !== profileStore.profile!.userId;
      },
      // イベントの編集を開始します。
      startEditEvent: () => {
        if (!state.selectedEvent) {
          return;
        }

        const startTimestamp = parseTimestamp(state.selectedEvent.start);
        state.startDate = startTimestamp.date;
        state.startTime = startTimestamp.time;

        if (state.selectedEvent.end) {
          const endTimestamp = parseTimestamp(state.selectedEvent.end);
          state.endDate = endTimestamp.date;
          state.endTime = endTimestamp.time;
        }

        state.newEvent = { ...state.selectedEvent } as NewCalendarEvent;
        state.isOpenEventMenu = false;
        state.isOpenEventDialog = true;
      },
      // イベント日付選択ダイアログに表示する日のフォーマットを行います。
      formatDayForDatePicker: (date: string) => {
        return new Date(date).getDate();
      },
      // イベント開始日付選択ダイアログを閉じます。
      closeStartDatePicker: () => {
        state.isOpenStartDatePicker = false;
      },
      // 日付/時刻選択ダイアログにバインドしている値を初期化します。
      clearPickerBindValue: () => {
        state.startDate = null;
        state.startTime = null;
        state.endDate = null;
        state.endTime = null;
      },
      // カレンダーを再描画します。
      refresh: () => {
        state.visible = false;
        nextTick(() => {
          state.visible = true;
        });
      },
      // イベントの変更内容を保存します。
      save: () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newEvent = state.newEvent!;

        newEvent.start = !state.startTime
          ? `${state.startDate}`
          : `${state.startDate} ${state.startTime}`;

        // 終了日は必須でない
        if (state.endDate) {
          newEvent.end = !state.endTime
            ? `${state.endDate}`
            : `${state.endDate} ${state.endTime}`;
        }

        if (!newEvent.id) {
          add(newEvent);
        } else {
          update(newEvent);
        }

        methods.clearPickerBindValue();
        state.isOpenEventDialog = false;
        methods.refresh();
      },
      // イベント開始時刻の値をクリアします。
      clearStartTime: () => {
        state.startTime = null;
        // イベント終了時刻のみの入力はできないため、イベント終了時刻もクリアする。
        state.endTime = null;
      },
      // イベント開始時刻選択ダイアログを閉じます。
      closeStartTimePicker: () => {
        state.isOpenStartTimePicker = false;
      },
      // イベント終了日付の値をクリアします。
      clearEndDate: () => {
        state.endTime = null;
        // イベント終了時刻もクリアする。
        state.endTime = null;
      },
      // イベント終了日付選択ダイアログを閉じます。
      closeEndDatePicker: () => {
        state.isOpenEndDatePicker = false;
      },
      // イベント終了時刻の値をクリアします。
      clearEndTime: () => {
        state.endTime = null;
      },
      // イベント終了時刻選択ダイアログを閉じます。
      closeEndTimePicker: () => {
        state.isOpenEndTimePicker = false;
      },
      // イベント登録/編集ダイアログを閉じます。
      closeEventDialog: () => {
        methods.clearPickerBindValue();
        state.isOpenEventDialog = false;
      },
    };

    return {
      ...toRefs(state),
      ...methods,
    };
  },
});
</script>
