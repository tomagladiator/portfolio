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

        <div class="uk-card-body">
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

                <p>
                    Me voilà disponible pour une mission de 4 jours / semaine, mercredi off (papa garde les filles). <br>
                    En <router-link to="/remote" uk-tooltip="Pourquoi le télétravail">télétravail</router-link> avec possibilité si besoin de déplacement 2 jours/semaine ( Proche de Lyon ). <br>
                    Mon taux journalier à partir de <router-link to="/negociator" uk-tooltip="Négocier mon TJM"><AnimatedNumber :number="400"></AnimatedNumber>€ HT</router-link>
                </p>

                <footer>
                    <cite>
                        Prenons le temps d’échanger autour d’un café/thé. <span style="font-style: normal;">☕</span>
                    </cite>
                </footer>
            </blockquote>
        </div>

        <div class="uk-card-footer">
            <h3 class="uk-card-title">Compétences</h3>

            <div uk-grid>

            <p>
                Tout est sur mon <a target="_blank" href="https://www.linkedin.com/in/tdesfossez" title="Linkedin">Linkedin</a>
            </p>

            <p>
                Voici mon résumé de <router-link to="/expertise">compétences !</router-link>
            </p>

            <p>
                Jetez un oeil sur mes <router-link to="/realisations">réalisations !</router-link>
            </p>

            <p>
                oldSchool? mon <a href="/thomas-desfossez-cv-2019-02.pdf" target="_blank">CV version 2019</a>
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

  methods: {
    onErased () {
      this.bipBoop === 'Developer' ? this.bipBoop = 'Mercenaire' : this.bipBoop = 'Developer'
    }
  },

  mounted () {
    // let fake3d = document.createElement('script')
    // fake3d.setAttribute('src', './js/app.js')
    // fake3d.setAttribute('data-id', 'toto')
    // fake3d.setAttribute('type', 'module')
    // document.head.appendChild(fake3d)
  },

  data () {
    return {
      bipBoop: 'Developer'
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
