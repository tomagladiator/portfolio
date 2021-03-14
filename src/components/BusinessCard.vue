<template>
  <div class="businessCard uk-animation-slide-bottom-small">
    <div class="uk-card uk-card-default uk-border-rounded uk-box-shadow-large">
        <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-auto@m">
                    <img id="gl" src="img/profil.jpg" alt="">
                </div>

                <div class="uk-width-expand@m">
                    <h2 class="uk-card-title uk-margin-remove-bottom">Thomas Desfossez</h2>
                    <p class="uk-margin-remove-top uk-margin-remove-bottom">Senior Front-End Web <vue-typer :text='bipBoop' :erase-on-complete='true' :erase-delay='70' erase-style='select-back' @erased='onErased'/> - Freelancer</p>
                    <p class="uk-text-meta"><span class="uk-icon " uk-icon="icon: location"></span> Neuville-Sur-Saône, 69250, FRANCE</p>
                </div>
            </div>
        </div>

        <div class="uk-card-body" v-if="this.$translate.current === 'fr'">
            <p>
                Entre le Canada et l'Europe, j'ai développé pendant 10 années une expérience professionnelle dans les domaines du développement web, de la gestion de projet Agile et de l'architecture front-end.
            </p>

            <p>
                Je reste à l'affût des nouvelles pratiques et technologies dans le domaine du web. <br>
                J'applique mes connaissances en <strong>accessibilité</strong>, en <strong>gestion de projets</strong>, en <strong>développement front-end</strong> et en <strong>design</strong> sur l'ensemble de mes projets.
            </p>

            <hr class="uk-divider-icon">

            <blockquote cite="#" class="uk-text-center">
                <span class="uk-icon uk-margin-small-right uk-icon-button" uk-icon="icon: quote-right; ratio: 2" style="transform: rotate(180deg)"></span>

                <p v-if="!availability" >
                    Actuellement en mission sur un projet de feu ! <br>
                    Promis, je vous tiendrai informé de mes disponibilités.
                </p>

                <p v-if="availability">
                    Me voilà disponible de 4 jours / semaine, lundi matin et mercredi après-midi off (papa garde les filles). <br>
                    En <router-link to="/remote" uk-tooltip="Pourquoi le télétravail">télétravail</router-link> avec possibilité si besoin de déplacement ( Proche de Lyon ).
                </p>

                <footer v-if="availability">
                    <cite>
                        Prenons le temps d’échanger autour d’un café/thé. <span style="font-style: normal;">☕</span>
                    </cite>
                </footer>
            </blockquote>
        </div>

        <div class="uk-card-body" v-if="this.$translate.current === 'en'">
            <p>
                Between Canada and Europe, I developed during 10 years a professional experience in the fields of web development, Agile project management and front-end architecture.
            </p>

            <p>
                I remain on the lookout for new practices and technologies in the field of the web. <br>
                I apply my knowledge in <strong>accessibility</strong>, in <strong>project management</strong>, in <strong>front-end development</strong> and in <strong>design</strong> on all my projects.
            </p>

            <hr class="uk-divider-icon">

            <blockquote cite="#" class="uk-text-center">
                <span class="uk-icon uk-margin-small-right uk-icon-button" uk-icon="icon: quote-right; ratio: 2" style="transform: rotate(180deg)"></span>

                <p v-if="!availability" >
                    Currently not available for a new mission! <br>
                    I promise, I'll keep you informed of my availability.
                </p>

                <p v-if="availability">
                    Here I am available for a 4 days / week mission, Monday morning and Wednesday afternoon off (dad is watching the girls). <br>
                    <router-link to="/remote" uk-tooltip="Why ?">Teleworking </router-link> with the possibility of traveling 1 day/week if necessary (near Lyon). <br>
                    My daily rate from <router-link to="/negociator" uk-tooltip="Négocier mon TJM"><AnimatedNumber :number="400"></AnimatedNumber>€ HT</router-link>
                </p>

                <footer v-if="availability">
                    <cite>
                        Let's take some time to chat over coffee / tea. <span style="font-style: normal;">☕</span>
                    </cite>
                </footer>
            </blockquote>
        </div>

        <div class="uk-card-footer">
            <h3 class="uk-card-title">{{ t('Compétences') }}</h3>

            <div uk-grid>

            <p>
                {{ t('Tout est sur mon') }} <a target="_blank" href="https://www.linkedin.com/in/tdesfossez" title="Linkedin">Linkedin</a>
            </p>

            <p>
                {{ t('Voici mon résumé de') }} <router-link to="/expertise">{{ t('compétences !') }}</router-link>
            </p>

            <p>
                {{ t('Jetez un oeil sur mes') }} <router-link to="/realisations">{{ t('réalisations') }} !</router-link>
            </p>

            <p v-if="availability">
                oldSchool? {{ t('mon') }} <a href="/thomas-desfossez-cv-2019-02.pdf" target="_blank">CV version 2019</a>
            </p>

            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'
import AnimatedNumber from '@/components/AnimatedNumber.vue'

export default {
  name: 'BusinessCard',

  components: {
    VueTyper,
    AnimatedNumber
  },

  data () {
    return {
      bipBoop: 'Developer',
      availability: false
    }
  },

  methods: {
    onErased () {
      this.bipBoop === 'Developer' ? this.bipBoop = 'Mercenary' : this.bipBoop = 'Developer'
    }
  },

  locales: {
    en: {
      'Jetez un oeil sur mes': 'Have a peek on my',
      'réalisations': 'realisations',
      'mon': 'my',
      'Compétences': 'skills',
      'Tout est sur mon': 'Everything is on my',
      'Voici mon résumé de': 'Here is my skills',
      'compétences !': 'summary !'
    }
  }
}
</script>

<style lang="scss">
.businessCard .vue-typer {
  .typed {
    color: #666 !important
  }
}

.businessCard #gl {
  width: 160px;
  height: 160px;
  border-radius: 160px;
  overflow: hidden;
}
</style>
