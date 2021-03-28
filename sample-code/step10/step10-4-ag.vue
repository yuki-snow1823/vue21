<script>
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
} from '@vue/composition-api';
import { parseDate } from 'vuetify/lib/components/VCalendar/util/timestamp';
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
      displayWeekday: computed(() => {
        return ['日', '月', '火', '水', '木', '金', '土'][state.today.weekday];
      }),
      /**
       * 時間指定のないイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEvents: computed(() => {
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
      filteredEventsHasTime: computed(() => {
        const displayUserIds = state.sharedUsers
          .filter(user => user.display)
          .map(user => user.userId);

        return todayCalendarEventMockData.filter(
          event => displayUserIds.includes(event.userId) && event.startTime,
        );
      }),
      // タイムラインを表示するかどうかを示す値です。
      displayTimeline: computed(() => {
        return state.filteredEventsHasTime.length > 0;
      }),
    });
    /**
     * イベントの色を取得します。
     */
    const getEventColor = event => {
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
