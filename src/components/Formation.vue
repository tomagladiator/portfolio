<template>
    <p class="formation" :class="injectedClass">
        <b>
            {{ data.year }}
        </b>

        <span
            v-for="(item, i) in data.items"
            :key="'form'+i"
        >
            <br />

            <span class="uk-icon uk-margin-small-right" uk-icon="icon: bookmark"></span>{{ item }}
        </span>
    </p>
</template>

<script>
export default {
  name: 'Formation',

  data () {
    return {
      injectedClass: ''
    }
  },

  props: {
    data: {
      type: Object,
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
.formation {
    opacity: 0
}
</style>
