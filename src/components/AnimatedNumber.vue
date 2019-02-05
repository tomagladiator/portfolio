<template>
  <span class="AnimatedNumber">
    {{displayNumber}}
  </span>
</template>

<script>
export default {
  name: 'AnimatedNumber',

  props: {
    number: Number
  },

  methods: {
    updateNumber () {
      clearInterval(this.interval)

      if (this.number === this.displayNumber) {
        return
      }

      this.interval = window.setInterval(function () {
        if (this.displayNumber !== this.number) {
          let change = (this.number - this.displayNumber) / 10

          change = change >= 0 ? Math.ceil(change) : Math.floor(change)

          this.displayNumber = this.displayNumber + change
        }
      }.bind(this), 20)
    }
  },

  created () {
    this.updateNumber()
  },

  data () {
    return {
      displayNumber: 400,
      interval: false
    }
  }
}
</script>

<style lang="scss">

</style>
