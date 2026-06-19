<template>
  <article class="match" :class="{ past: isPast }" :data-match-id="match.matchId">
    <div class="match-header">
      <span class="match-number">Match {{ match.matchNumber }}</span>
      <span class="match-date">{{ match.date }}</span>
    </div>

    <div class="teams">
      <div class="team">
        <span
          class="team-slot"
          :class="slotClass(match.home, homeWinner)"
          :style="slotStyle(match.home)"
          @click="homeWinner = !homeWinner"
          @contextmenu.prevent="$emit('edit-slot', match.home)"
        >{{ slotText(match.home) }}</span>
        <span class="team-note">{{ slotNote(match.home) }}</span>
      </div>
      <div class="team">
        <span
          class="team-slot"
          :class="slotClass(match.away, awayWinner)"
          :style="slotStyle(match.away)"
          @click="awayWinner = !awayWinner"
          @contextmenu.prevent="$emit('edit-slot', match.away)"
        >{{ slotText(match.away) }}</span>
        <span class="team-note">{{ slotNote(match.away) }}</span>
      </div>
    </div>

    <div class="meta">
      <div class="meta-line">{{ match.stadium }}</div>
      <div class="meta-line">{{ cityLabel }}</div>
    </div>
  </article>
</template>

<script>
import { TRAINING_CLIMATE, HOST_CITY_TEMPS_JULY, HOST_CITY_COORDS } from '../data/climate.js'
import { tempToColor, isPastDate } from '../utils/temperature.js'
import { shouldFetchLiveTemp, fetchLiveTemp } from '../utils/openMeteo.js'
import { describeSlot } from '../utils/slots.js'

export default {
  emits: ['edit-slot'],

  props: {
    match:       { type: Object, required: true },
    assignments: { type: Object, required: true },
  },

  data() {
    return {
      homeWinner: false,
      awayWinner: false,
      liveTemp:   null,
    }
  },

  computed: {
    isPast() {
      return isPastDate(this.match.isoDate)
    },

    cityLabel() {
      const julyTemp = HOST_CITY_TEMPS_JULY[this.match.city] ?? null
      if (julyTemp == null) return this.match.city
      const base = `${this.match.city} (${julyTemp}°C avg Jul`
      return this.liveTemp != null
        ? `${base}, ${this.liveTemp.toFixed(1)}°C match-day)`
        : `${base})`
    },
  },

  async mounted() {
    if (shouldFetchLiveTemp(this.match.isoDate)) {
      const coords = HOST_CITY_COORDS[this.match.city]
      if (coords) {
        this.liveTemp = await fetchLiveTemp(this.match.city, this.match.isoDate, coords)
      }
    }
  },

  methods: {
    getClimate(slot) {
      const team = this.assignments[slot]
      return team ? (TRAINING_CLIMATE[team] ?? null) : null
    },

    slotText(slot) {
      const team    = this.assignments[slot]
      if (!team) return slot
      const climate = TRAINING_CLIMATE[team]
      return climate ? `${team} (${climate.tempC}°C)` : team
    },

    slotClass(slot, isWinner) {
      const team    = this.assignments[slot]
      const climate = team ? TRAINING_CLIMATE[team] : null
      return {
        assigned:  !!team,
        'has-temp': !!climate,
        winner:    isWinner,
      }
    },

    slotStyle(slot) {
      const climate = this.getClimate(slot)
      return climate ? { '--temp-bg': tempToColor(climate.tempC) } : {}
    },

    slotNote(slot) {
      const team = this.assignments[slot]
      const desc = describeSlot(slot)
      return (team && desc) ? `${desc} (${slot})` : desc
    },
  },
}
</script>
