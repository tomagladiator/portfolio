<template>
    <p class="experience" :class="injectedClass">
        <b>{{date}}</b> <br />
        {{title}}
    </p>
</template>

<script>
export default {
  name: 'Experience',

  data () {
    return {
      injectedClass: ''
    }
  },

  props: {
    date: {
      type: String,
      required: true
    },

    title: {
      type: String,
      required: true
    }
  },

  created () {
    setTimeout(() => {
      this.injectedClass = 'uk-animation-slide-right-small'
    }, Math.random() * (1000 - 150) + 150)
  }
}
</script>

<style lang="css">
.experience {
    opacity: 0
}
</style>
