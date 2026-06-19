<template>
  <article class="match group-match" :class="{ past: isPast }" :data-match-id="match.matchId">
    <div class="match-header">
      <span class="match-date">{{ match.fullDate }}</span>
      <span class="city-label">{{ cityLabel }}</span>
    </div>

    <div class="teams">
      <div
        class="team-name"
        :class="teamClass(match.home, homeWinner)"
        :style="teamStyle(match.home)"
        @click="homeWinner = !homeWinner"
      >{{ teamText(match.home) }}</div>
      <div
        class="team-name"
        :class="teamClass(match.away, awayWinner)"
        :style="teamStyle(match.away)"
        @click="awayWinner = !awayWinner"
      >{{ teamText(match.away) }}</div>
    </div>
  </article>
</template>

<script>
import { TRAINING_CLIMATE, HOST_CITY_TEMPS_JULY, HOST_CITY_COORDS } from '../data/climate.js'
import { tempToColor, isPastDate } from '../utils/temperature.js'
import { shouldFetchLiveTemp, fetchLiveTemp } from '../utils/openMeteo.js'

export default {
  props: {
    match: { type: Object, required: true },
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
    teamText(name) {
      const climate = TRAINING_CLIMATE[name]
      return climate ? `${name} (${climate.tempC}°C)` : name
    },

    teamClass(name, isWinner) {
      return {
        'has-temp': !!TRAINING_CLIMATE[name],
        winner:    isWinner,
      }
    },

    teamStyle(name) {
      const climate = TRAINING_CLIMATE[name]
      return climate ? { '--temp-bg': tempToColor(climate.tempC) } : {}
    },
  },
}
</script>
