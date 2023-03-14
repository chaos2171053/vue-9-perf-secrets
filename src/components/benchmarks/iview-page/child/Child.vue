<template>
  <Benchmark title="iview Child component splitting">
    <template #toolbar>
      <PlayToggle v-model="play"/>
    </template>

    <template #on>
      <div class="grid">
        <ChildOn
          :key="list.length"
          class="cell"
        />
      </div>
    </template>

    <template #off>
      <div class="grid">
        <ChildOff
          :key="list.length"
        />
      </div>
    </template>
  </Benchmark>
</template>

<script>
import ChildOn from './ChildOn.vue'
import ChildOff from './ChildOff.vue'

export default {
  components: {
    ChildOn,
    ChildOff,
  },

  data () {
    return {
      play: false,
      list: [],
    }
  },

  watch: {
    play (value) {
      if (value) this.generate()
    },
  },

  created () {
    this.count = 300
    this.generate()
  },

  methods: {
    generate () {
      const data = []
      for (let i = 0; i < this.count; i++) {
        data.push(Math.random() * 300)
      }
      this.list = data
      this.play && requestAnimationFrame(this.generate)
    },
  },
}
</script>

