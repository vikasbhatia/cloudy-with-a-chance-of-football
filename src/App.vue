<template>
  <h1>World Cup 2026 Heat Bracket</h1>
  <p class="subtitle">
    Click any team name to toggle gold highlight &nbsp;·&nbsp;
    Right-click a bracket slot to assign a team
  </p>

  <nav class="main-nav">
    <button
      class="tab-button"
      :class="{ active: activeTab === 'bracket' }"
      @click="activeTab = 'bracket'"
    >Knockout Bracket</button>
    <button
      class="tab-button"
      :class="{ active: activeTab === 'schedule' }"
      @click="activeTab = 'schedule'"
    >Group Stage Schedule</button>
  </nav>

  <BracketView  v-show="activeTab === 'bracket'" />
  <ScheduleView v-show="activeTab === 'schedule'" />
</template>

<script>
import BracketView  from './components/BracketView.vue'
import ScheduleView from './components/ScheduleView.vue'

export default {
  components: { BracketView, ScheduleView },
  data() {
    return { activeTab: 'bracket' }
  },
}
</script>
