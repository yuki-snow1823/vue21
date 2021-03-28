<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
} from '@vue/composition-api';
import { CalendarEvent } from 'vuetify';
import { parseDate } from 'vuetify/lib/components/VCalendar/util/timestamp';
import { CalendarEventTodayDetail } from '@/store/calendar-event.model';
import { todayCalendarEventMockData } from '@/store/calendar-event';
import { sharedUserStore, getThemeColor } from '@/store/shared-user';

export default defineComponent({
  setup() {
    const state = reactive({
      // 本日の日付です。
      today: parseDate(new Date()),
      // カレンダーを共有しているユーザーです。
      sharedUsers: sharedUserStore.sharedUsers,
      // 本日の曜日です。
      displayWeekday: computed((): string => {
        return ['日', '月', '火', '水', '木', '金', '土'][state.today.weekday];
      }),
      /**
       * 時間指定のないイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEvents: computed((): CalendarEventTodayDetail[] => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return todayCalendarEventMockData.filter(
          event => displayUserIds.includes(event.userId) && !event.startTime,
        );
      }),
      /**
       * 時間指定のあるイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEventsHasTime: computed((): CalendarEventTodayDetail[] => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return todayCalendarEventMockData.filter(
          event => displayUserIds.includes(event.userId) && event.startTime,
        );
      }),
      // タイムラインを表示するかどうかを示す値です。
      displayTimeline: computed((): boolean => {
        return state.filteredEventsHasTime.length > 0;
      }),
    });
    /**
     * イベントの色を取得します。
     */
    const getEventColor = (event: CalendarEvent) => {
      if (!event) {
        return;
      }

      return getThemeColor(event.userId);
    };

    return {
      ...toRefs(state),
      getEventColor,
    };
  },
});
</script>
