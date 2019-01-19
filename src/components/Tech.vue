<template>
    <div class="tech" :class="injectedClass">
        <div v-html="svg"></div>
    </div>
</template>

<script>
export default {
  name: 'Tech',

  props: {
    svg: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      injectedClass: ''
    }
  },

  created () {
    setTimeout(() => {
      this.injectedClass = 'uk-animation-slide-bottom-small'
    }, Math.random() * (1000 - 150) + 150)
  }
}
</script>

<style>
.tech {
  opacity: 0
}
</style>
