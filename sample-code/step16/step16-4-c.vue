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
import { getThemeColor } from '@/store/shared-user';
import { useSharedEvents } from '@/modules/use-shared-events';

export default defineComponent({
  setup() {
    const { sharedEventState, getDisplayUserIds } = useSharedEvents();
    const state = reactive({
      // 本日の日付です。
      today: parseDate(new Date()),
      // 本日の曜日です。
      displayWeekday: computed((): string => {
        return ['日', '月', '火', '水', '木', '金', '土'][state.today.weekday];
      }),
      /**
       * 時間指定のないイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEvents: computed((): CalendarEventTodayDetail[] => {
        return todayCalendarEventMockData.filter(
          event =>
            getDisplayUserIds().includes(event.userId) && !event.startTime,
        );
      }),
      /**
       * 時間指定のあるイベントです。
       * スイッチによってフィルタリングを行います。
       */
      filteredEventsHasTime: computed((): CalendarEventTodayDetail[] => {
        return todayCalendarEventMockData.filter(
          event =>
            getDisplayUserIds().includes(event.userId) && event.startTime,
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
      ...toRefs(sharedEventState),
      ...toRefs(state),
      getEventColor,
    };
  },
});
</script>
