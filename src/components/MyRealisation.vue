<template>
  <div class="my-realisation uk-margin-medium-bottom" :data-tech="dataTech">
    <div class="uk-card uk-card-default">
        <div class="uk-card-media-top uk-overflow-hidden">
            <div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover th-img" :class="injectedClass" :data-src="imgUrl" uk-img>

            </div>
        </div>

        <hr class="uk-margin-remove-vertical">

        <div class="uk-flex uk-flex-between uk-flex-column" style="height: calc(100% - 300px);">
            <div class="uk-card-body">
                <div class="uk-background-default uk-padding-small uk-border-rounded uk-box-shadow-large" style="position:absolute; top: -15px; left:-15px">
                    <img :data-src="logoUrl" :alt="project" uk-img />
                </div>

                <div class="uk-card-badge uk-label">{{ year }}</div>

                <p class="uk-text-uppercase uk-margin-remove-top">
                    {{ descClient }}
                </p>

                <p class="">
                    {{ descProject }}
                </p>
            </div>

            <div>
                <div class="uk-card-body uk-text-center">
                    <span class="uk-icon uk-margin-small-right" uk-icon="icon: home" title="agence"></span> <span class="uk-margin-medium-right">{{ agency }}</span>
                    <span class="uk-icon uk-margin-small-right" uk-icon="icon: tag"></span> {{ titleJob }}
                </div>

                <div class="uk-card-footer uk-text-center">
                    <span class="uk-text-meta">{{ hashtag }}</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessCard',

  data () {
    return {
      injectedClass: ''
    }
  },

  props: {
    year: String,
    project: String,
    imgUrl: String,
    logoUrl: String,
    descClient: String,
    descProject: String,
    agency: String,
    titleJob: String,
    dataTech: String,
    hashtag: String
  },

  created () {
    setTimeout(() => {
      this.injectedClass = 'uk-animation-kenburns'
    }, Math.random() * (1000 - 150) + 150)
  }
}
</script>

<style scoped lang="scss">
    .th-img {
        transition: all 0.4s cubic-bezier(0.3,1.08,1,1);
        background-position: top;
    }

    .uk-card:hover .th-img {
       background-position: top;
    }
</style>
