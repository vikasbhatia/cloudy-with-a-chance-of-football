<template>
  <div class="schedule-grid">
    <GroupSection
      v-for="group in groupStageData"
      :key="group.group"
      :group="group"
    />
  </div>
</template>

<script>
import { groupStageData } from '../data/groupStage.js'
import GroupSection from './GroupSection.vue'

export default {
  components: { GroupSection },
  data() {
    return { groupStageData }
  },
}
</script>
