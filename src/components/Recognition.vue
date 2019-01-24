<template>
    <div class="recognition" :class="injectedClass">
        <span class="uk-icon uk-margin-small-right" uk-icon="icon: star"></span>{{ text }} <br>
    </div>
</template>

<script>
export default {
  name: 'Recognition',

  data () {
    return {
      injectedClass: ''
    }
  },

  props: {
    text: {
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
.recognition {
    opacity: 0
}
</style>
