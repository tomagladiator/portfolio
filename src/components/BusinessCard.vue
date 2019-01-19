<template>
  <div class="business-card">
    <div class="uk-card uk-card-default uk-border-rounded uk-box-shadow-large">
        <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-auto@m">
                    <img alt="Thomas Desfossez" src="../assets/thomas-desfossez-2019.jpg" class="uk-border-circle" width="160" height="160">
                </div>

                <div class="uk-width-expand@m">
                    <h2 class="uk-card-title uk-margin-remove-bottom">Thomas Desfossez</h2>
                    <p class="uk-margin-remove-top uk-margin-remove-bottom">{{ msg }}</p>
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
                <p >
                    <span class="uk-icon uk-margin-small-right uk-icon-button" uk-icon="icon: quote-right; ratio: 2" style="transform: rotate(180deg)"></span>
                    Me voilà disponible pour une mission de 4 jours / semaine, mercredi off (papa garde les filles). <br>
                    En télétravail avec possibilité si besoin de déplacement 1 jour semaine ( Proche de Lyon ). <br>
                    Mon taux journalier est de 600€ HT
                </p>

                <footer>
                    <cite>
                        Prenons le temps d’échanger autour d’un café/thé. <span style="font-style: normal;">☕</span>
                        <span class="uk-icon uk-margin-small-left uk-icon-button" uk-icon="icon: quote-right; ratio: 2"></span
                    ></cite>
                </footer>
            </blockquote>
        </div>

        <div class="uk-card-footer">
            <h3 class="uk-card-title">Compétences</h3>

            <p>
                Tout est sur mon <a target="_blank" href="https://www.linkedin.com/in/tdesfossez" title="Linkedin"><span class="uk-icon uk-margin-small-right uk-icon-button" uk-icon="icon: linkedin"></span></a>
            </p>

            <p>
                Vous pouvez aussi consulter mon <a href="/thomas-desfossez-cv-2019.jpg" target="_blank">CV version 2019</a>
            </p>

            <p>
                 Voir aussi mon résumé de <router-link to="/expertise">compétences !</router-link>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessCard',

  props: {
    msg: String
  },

  data () {
    return {
      myImage: '../assets/thomas-avatar.jpg',
      otherImage: '../assets/thomas-desfossez-2019.jpg'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
