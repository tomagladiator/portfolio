<template>
  <div id="app" :class="modeClassIs">
    <div v-if="!isHidden" id="toggle-menu" uk-offcanvas="overlay: true; flip: true; mode: push">
      <div class="uk-offcanvas-bar">
        <button class="uk-offcanvas-close" type="button" uk-close ref="closeButton"></button>

        <ul class="uk-nav uk-nav-default">
            <li class="uk-margin-small-bottom"  v-on:click="triggerClose">
              <router-link to="/">
                <span class="uk-icon uk-margin-small-right" uk-icon="icon: home" ></span> Accueil
              </router-link>
            </li>

            <li class="uk-margin-small-bottom"  v-on:click="triggerClose">
              <router-link to="/realisations">
                <span class="uk-icon uk-margin-small-right" uk-icon="icon: check"></span> Mes réalisations
              </router-link>
            </li>

            <li class="uk-margin-small-bottom"  v-on:click="triggerClose">
              <router-link to="/chatbot">
                <span class="uk-icon uk-margin-small-right" uk-icon="icon: comments"></span> Une mission&nbsp;?
              </router-link>
            </li>

            <li class="uk-margin-small-bottom"  v-on:click="triggerClose">
              <router-link to="/contact">
                <span class="uk-icon uk-margin-small-right" uk-icon="icon: mail"></span> Contact
              </router-link>
            </li>

            <li class="uk-nav-divider uk-margin-small-bottom"></li>

            <li class="uk-margin-small-bottom"  v-on:click="triggerClose">
              <a href="https://www.linkedin.com/in/tdesfossez" target="_blank" title="Linkedin">
                <span class="uk-margin-small-right uk-icon-button" uk-icon="icon: linkedin" style="fill: white"></span> Linkedin
              </a>
            </li>

            <li class="uk-margin-small-bottom" v-on:click="triggerClose">
              <a href="https://github.com/tomagladiator" target="_blank" title="Github">
                <span class="uk-margin-small-right uk-icon-button" uk-icon="icon: github" style="fill: white"></span> Github
              </a>
            </li>

            <li v-on:click="triggerClose">
              <a href="#" v-on:click="darkLight">
                <span class="uk-margin-small-right uk-icon-button" uk-icon="icon: paint-bucket" style="fill: white"></span> Dark mode
              </a>
            </li>
        </ul>
      </div>
    </div>

    <div v-if="!isHidden" uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;animation: uk-animation-slide-top-small;show-on-up: true">
      <div class="uk-container uk-container-expand uk-background-primary">

        <!-- NAVBAR -->
        <nav class="uk-navbar-container uk-light " uk-navbar style="position: relative; z-index: 980; background: transparent">
          <div class="uk-navbar-left">
            <router-link to="/" class="uk-navbar-item uk-logo" title="retourner sur l'accueil">
              Thomas Desfossez
            </router-link>
          </div>

          <button type="button" uk-navbar-toggle-icon uk-toggle="target: #toggle-menu" class="uk-navbar-right uk-navbar-toggle uk-hidden@m uk-navbar-toggle-icon uk-icon">

          </button>

          <div class="uk-navbar-right uk-visible@m">
            <ul class="uk-navbar-nav" id="nav">
              <li class="uk-margin-left">
                <router-link to="/realisations">
                  <span class="uk-icon uk-margin-small-right" uk-icon="icon: check"></span> {{ t('Mes réalisations') }}
                </router-link>
              </li>

              <!-- <li class="uk-margin-left">
                <router-link to="/articles">
                  <span class="uk-icon uk-margin-small-right" uk-icon="icon: star"></span> Articles
                </router-link>
              </li> -->

              <li class="uk-margin-left">
                <router-link to="/chatbot">
                  <span class="uk-icon uk-margin-small-right" uk-icon="icon: comments"></span> {{ t('Une mission ?') }}
                </router-link>
              </li>

              <li class="uk-margin-left">
                <router-link to="/contact">
                  <span class="uk-icon uk-margin-small-right" uk-icon="icon: mail"></span> {{ t('Contact') }}
                </router-link>
              </li>

              <li class="uk-margin-left">
                <a href="https://www.linkedin.com/in/tdesfossez" target="_blank">
                  <span uk-tooltip="Linkedin" class="uk-icon uk-margin-small-right uk-icon-button" uk-icon="icon: linkedin"></span>
                </a>
              </li>

              <li>
                <a href="https://github.com/tomagladiator" target="_blank">
                  <span uk-tooltip="Github" class="uk-icon uk-margin-small-right uk-icon-button" uk-icon="icon: github"></span>
                </a>
              </li>

              <li>
                <a href="#" @click="darkLight" >
                  <span uk-tooltip="Theme Dark/Light" class="uk-margin-small-right uk-icon-button" uk-icon="icon: paint-bucket"></span>
                </a>
              </li>

              <li>
                <a href="#" @click="toggleLang" :title="t('ChangeLanguageTo')" >
                  {{ t('En') }}
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <!-- / NAVBAR -->

      </div>
    </div>

    <main class="main-content">
      <router-view />
    </main>

    <footer v-if="!isHidden" class="main-footer uk-grid-collapse uk-child-width-expand@s uk-text-center uk-background-primary" uk-grid>
      <div>
        <div class="uk-padding-small uk-light">Thomas Desfossez &copy; 2020</div>
      </div>
    </footer>
  </div>
</template>

<script>
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import { EventBus } from './event-bus.js'

UIkit.use(Icons)

export default {
  name: 'App',

  metaInfo: {
    title: 'Thomas Desfossez - Freelance - Lead Front-End Senior sur Lyon',
    titleTemplate: '%s | Thomas Desfossez'
  },

  data () {
    return {
      isHidden: false,
      modeDarkLight: 'light',
      lang: 'fr'
    }
  },

  computed: {
    modeClassIs () {
      if (this.modeDarkLight === 'dark') {
        return 'dark uk-light'
      } else {
        return 'light uk-dark'
      }
    }
  },

  methods: {
    toggleLang () {
      if (this.lang === 'fr') {
        this.$translate.setLang('en')

        this.lang = 'en'
      } else {
        this.$translate.setLang('fr')

        this.lang = 'fr'
      }
    },

    triggerClose () {
      this.$refs.closeButton.click()
    },

    darkLight () {
      this.modeDarkLight = this.modeDarkLight === 'light' ? 'dark' : 'light'
      this.$cookie.delete('mode')
      this.$cookie.set('mode', this.modeDarkLight, 10)
    }
  },

  mounted () {
    this.$translate.setLang('fr')

    EventBus.$on('hideLayout', customMessage => {
      this.isHidden = customMessage
    })

    if (this.$cookie.get('mode') === 'dark') {
      this.modeDarkLight = 'dark'
    }
  },

  locales: {
    en: {
      'Mes réalisations': 'My realisations',
      'Une mission ?': 'An assignment ?',
      'Contact': 'Contact',
      'ChangeLanguageTo': 'Changer la langue en français',
      'En': 'Fr'
    },

    fr: {
      'ChangeLanguageTo': 'Change language to english'
    }
  }
}

</script>

<style lang="scss">
@import "../node_modules/uikit/src/scss/mixins-theme.scss";
@import "../node_modules/uikit/src/scss/variables-theme.scss";
@import "../node_modules/uikit/src/scss/uikit-theme.scss";

.dark {
  background-color: #2d2d2d;

  .uk-section-primary {
    background-color: #053362;
  }

  .uk-background-primary {
    background-color: #222;
  }

  .businessCard .vue-typer .typed {
    color: #bababa !important;
  }

  .uk-card-default {
    background-color: #222;
    color: #fff;

    div, p, span {
      color: #bababa !important;
      border-color: #525252 !important;
    }

    h1, h2, h3, h4 {
      color: #fff;
    }
  }

  div[style="background: rgb(240, 80, 110);"] {
    background-color: #2d2d2d !important;
  }

  .chat .uk-card-default div {
    color: #f1f1f1 !important;
  }
}
</style>
