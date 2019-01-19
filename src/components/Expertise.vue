<template>
    <div>
        <h2>
            {{ title }}
        </h2>

        <p v-html="text"></p>

        <progress class="uk-progress" :value="progression" max="100">
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
      progression: 0
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
      const progressionInterval = setInterval(() => {
        this.progression += 5

        if (this.progression >= this.progress) {
          clearInterval(progressionInterval)
        }
      }, Math.random() * (200 - 150) + 150)
    }
  },

  created () {
    this.progressAnimate()
  }
}
</script>
