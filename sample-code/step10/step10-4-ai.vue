<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CalendarEvent } from 'vuetify';
import { parseDate } from 'vuetify/lib/components/VCalendar/util/timestamp';
import { todayCalendarEventMockData } from '@/store/calendar-event';
import { sharedUserStore, getThemeColor } from '@/store/shared-user';

@Component
export default class HomeComponent extends Vue {
  /**
   * 本日の日付です。
   */
  private today = parseDate(new Date());

  /**
   * カレンダーを共有しているユーザーです。
   */
  private sharedUsers = sharedUserStore.sharedUsers;

  /**
   * 本日の曜日です。
   */
  private get displayWeekday() {
    return ['日', '月', '火', '水', '木', '金', '土'][this.today.weekday];
  }

  /**
   * 時間指定のないイベントです。
   * スイッチによってフィルタリングを行います。
   */
  private get filteredEvents() {
    const displayUserIds = this.sharedUsers
      .filter(user => user.display)
      .map(user => user.userId);

    return todayCalendarEventMockData.filter(
      event => displayUserIds.includes(event.userId) && !event.startTime,
    );
  }

  /**
   * 時間指定のあるイベントです。
   * スイッチによってフィルタリングを行います。
   */
  private get filteredEventsHasTime() {
    const displayUserIds = this.sharedUsers
      .filter(user => user.display)
      .map(user => user.userId);

    return todayCalendarEventMockData.filter(
      event => displayUserIds.includes(event.userId) && event.startTime,
    );
  }

  /**
   * タイムラインを表示するかどうかを示す値です。
   */
  private get displayTimeline() {
    return this.filteredEventsHasTime.length > 0;
  }

  /**
   * イベントの色を取得します。
   */
  private getEventColor(event: CalendarEvent) {
    if (!event) {
      return;
    }

    return getThemeColor(event.userId);
  }
}
</script>
