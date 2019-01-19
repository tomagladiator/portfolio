<template>
    <div>
        <h2>
            {{ title }}
        </h2>

        <p v-html="text"></p>

        <progress class="uk-progress" :class="injectedClass" :value="progression" max="100">
            {{ progression }}%
        </progress>

        <hr />
    </div>
</template>

<script>
export default {
  name: 'Expertise',

  data () {
    return {
      progression: 0,

      injectedClass: 'uk-animation-scale-up',

      time: 0
    }
  },

  props: {
    title: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    },

    progress: {
      type: Number,
      required: true
    }
  },

  methods: {
    progressAnimate () {
      let time = Math.floor(Math.random() * (200 - 100) + 100)

      this.time = time

      const progressionInterval = setInterval(() => {
        this.progression += 5

        if (this.progression >= this.progress) {
          clearInterval(progressionInterval)
        }
      }, time) // random between 1s and 500ms
    }
  },

  created () {
    this.progressAnimate()
  }
}
</script>

<style lang="css" scoped>
</style>
