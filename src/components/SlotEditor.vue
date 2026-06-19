<template>
  <div v-if="visible" class="overlay" @click.self="$emit('close')">
    <div class="editor-panel">
      <h2 class="editor-title">Edit slot {{ slotCode }}</h2>
      <p class="editor-subtitle">
        Start typing a country name. Suggestions come from the 48 World Cup 2026 teams.
      </p>

      <form class="editor-form" @submit.prevent="onSave">
        <label for="slotEditorInput">Team for this slot</label>
        <input
          id="slotEditorInput"
          ref="input"
          class="editor-input"
          type="text"
          list="teamOptions"
          autocomplete="off"
          placeholder="e.g. Argentina"
          v-model="inputValue"
        />
        <datalist id="teamOptions">
          <option v-for="team in teams" :key="team" :value="team" />
        </datalist>

        <div class="editor-actions">
          <button type="button" class="editor-button secondary" @click="$emit('close')">Cancel</button>
          <button type="button" class="editor-button secondary" @click="onClear">Clear</button>
          <button type="submit" class="editor-button primary">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { TEAMS } from '../data/groups.js'

export default {
  emits: ['save', 'clear', 'close'],

  props: {
    visible:      { type: Boolean, required: true },
    slotCode:     { type: String,  default: null  },
    currentValue: { type: String,  default: ''    },
  },

  data() {
    return {
      teams:      TEAMS,
      inputValue: '',
    }
  },

  watch: {
    slotCode(newVal) {
      if (newVal) {
        this.inputValue = this.currentValue || ''
        this.$nextTick(() => this.$refs.input?.focus())
      }
    },
  },

  mounted() {
    document.addEventListener('keydown', this.onKeydown)
  },

  unmounted() {
    document.removeEventListener('keydown', this.onKeydown)
  },

  methods: {
    onSave() {
      this.$emit('save', { slotCode: this.slotCode, value: this.inputValue })
    },

    onClear() {
      this.$emit('clear', this.slotCode)
    },

    onKeydown(e) {
      if (e.key === 'Escape' && this.visible) this.$emit('close')
    },
  },
}
</script>
