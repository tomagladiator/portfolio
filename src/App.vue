<template>
  <div id="app">
    <div id="toggle-menu" uk-offcanvas="overlay: true; flip: true; mode: push">
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

            <li>
              <a href="https://github.com/tomagladiator" target="_blank" title="Github"  v-on:click="triggerClose">
                <span class="uk-margin-small-right uk-icon-button" uk-icon="icon: github" style="fill: white"></span> Github
              </a>
            </li>
        </ul>
      </div>
    </div>

    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky;">
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
                  <span class="uk-icon uk-margin-small-right" uk-icon="icon: check"></span> Mes réalisations
                </router-link>
              </li>

              <!-- <li class="uk-margin-left">
                <router-link to="/articles">
                  <span class="uk-icon uk-margin-small-right" uk-icon="icon: star"></span> Articles
                </router-link>
              </li> -->

              <li class="uk-margin-left">
                <router-link to="/chatbot">
                  <span class="uk-icon uk-margin-small-right" uk-icon="icon: comments"></span> Une mission&nbsp;?
                </router-link>
              </li>

              <li class="uk-margin-left">
                <router-link to="/contact">
                  <span class="uk-icon uk-margin-small-right" uk-icon="icon: mail"></span> Contact
                </router-link>
              </li>

              <li class="uk-margin-left">
                <a href="https://www.linkedin.com/in/tdesfossez" target="_blank" title="Linkedin">
                  <span class="uk-icon uk-margin-small-right uk-icon-button" uk-icon="icon: linkedin"></span>
                </a>
              </li>

              <li>
                <a href="https://github.com/tomagladiator" target="_blank" title="Github">
                  <span class="uk-icon uk-margin-small-right uk-icon-button" uk-icon="icon: github"></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <!-- / NAVBAR -->

      </div>
    </div>
    <router-view/>

    <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center" uk-grid>
      <div>
        <div class="uk-background-primary uk-padding uk-light">Constraint Solver &copy; 2019</div>
      </div>
    </div>
  </div>
</template>

<script>
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

UIkit.use(Icons)

export default {
  name: 'App',
  metaInfo: {
    title: 'Thomas Desfossez - Freelance - Lead Front-End Senior sur Lyon',
    titleTemplate: '%s | Thomas Desfossez'
  },
  methods: {
    triggerClose () {
      this.$refs.closeButton.click()
    }
  }
}

</script>

<style lang="scss">
@import "../node_modules/uikit/src/scss/mixins-theme.scss";
@import "../node_modules/uikit/src/scss/variables-theme.scss";
@import "../node_modules/uikit/src/scss/uikit-theme.scss";
</style>
