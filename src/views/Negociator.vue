<template>
  <div class="thanks">
    <div class="uk-container">
      <div class="uk-card uk-card-body">
        <h1 class="uk-margin-remove">
          Alors comme cela tu souhaites négocier mon TJM ?
        </h1>

        <h2 class="uk-margin-remove">
         Que le jeu commence!
        </h2>

        <p>
          Hey Thomas! tu auras la chance de travailler sur un projet d'une durée
          <button
            class="uk-button uk-button-default uk-button-small uk-text-lowercase"
            type="button"
            @click="durationIsOpen = !durationIsOpen"
            v-html="duration"
          /> !
        </p>

        <input
            class     ="uk-range uk-margin-bottom"
            type      ="range"
            value     ="1"
            min       ="0"
            max       ="4"
            step      ="1"
            v-model   ="rangeValueDuration"
            v-if      ="durationIsOpen"
        >

        <p>
          Aussi, avec ce projet, sachant que tu ne peux pas te déplacer les lundi et les mercredi, tu pourras travailler en remote
          <button
            class="uk-button uk-button-default uk-button-small uk-text-lowercase"
            type="button"
            @click="remoteIsOpen = !remoteIsOpen"
            v-html="remote"
          /> par semaine!
        </p>

        <input
            class     ="uk-range uk-margin-bottom"
            type      ="range"
            value     ="5"
            min       ="2"
            max       ="5"
            step      ="1"
            v-model   ="rangeValueRemote"
            v-if      ="remoteIsOpen"
        >

        <p>
          Mais ce qui nous rend irresistible c'est le stack technologique que tu vas utiliser comme
          <button
            class="uk-button uk-button-default uk-button-small"
            type="button"
            @click="technosIsOpen = !technosIsOpen"
            v-if="technos.length !== 0"
          >
            <span v-for="tech in technos" :key="tech">
              <strong>{{tech}}</strong>,
            </span>
          </button>
        </p>

        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid" v-if="technosIsOpen">
            <label><input class="uk-checkbox" type="checkbox" value="VueJs"      v-model="technos"> VueJs</label>
            <label><input class="uk-checkbox" type="checkbox" value="JavaScript" v-model="technos"> JavaScript ES6</label>
            <label><input class="uk-checkbox" type="checkbox" value="React"      v-model="technos"> React</label>
            <label><input class="uk-checkbox" type="checkbox" value="Angular"    v-model="technos"> Angular</label>
            <label><input class="uk-checkbox" type="checkbox" value="Git"        v-model="technos" checked> Git</label>
            <label><input class="uk-checkbox" type="checkbox" value="Agile"      v-model="technos" checked> Agile</label>
        </div>

        <p>
         En plus cette mission est top car
          <button
            class="uk-button uk-text-left uk-button-default uk-button-small uk-text-lowercase"
            type="button"
            @click="avantagesIsOpen = !avantagesIsOpen"
            v-if="avantages.length !== 0"
          >
            <span v-for="avantage in avantages" :key="avantage">
              <strong>{{avantage}}</strong>,
            </span>
          </button>
        </p>

        <div class="uk-margin" v-if="avantagesIsOpen">
            <label><input class="uk-checkbox" type="checkbox" value="C'est un nouveau projet / refonte!" v-model="avantages" checked > C'est un nouveau projet / refonte!</label> <br>
            <label><input class="uk-checkbox" type="checkbox" value="C'est du support d'un site existant" v-model="avantages"> C'est du support d'un site existant</label> <br>
            <label><input class="uk-checkbox" type="checkbox" value="C'est un client d'envergure"  v-model="avantages"> C'est un client d'envergure</label>
        </div>

        <div class="uk-card uk-card-default uk-width-1-1@m uk-margin-large-top">
            <div class="uk-card-header">
                <div class="uk-grid-small uk-flex uk-flex-middle" uk-grid>
                    <div>
                        <img class="uk-border-circle" width="40" height="40" src="../assets/thomas-desfossez-2019.jpg" />
                    </div>

                    <div>
                        <p class="uk-margin-remove">
                          mmmh... suivant tout ces arguments, je peux te proposer <strong>{{tjm}}€</strong> <span v-if="tjm === 400" class="uk-text-success"> (<i>Bravo, vous avez négocié le meilleur taux!</i>)</span> <span v-if="tjm === 840" class="uk-text-danger"> (<i>"Que trépasse si je faiblisse!"</i>)</span> par jour.
                        </p>

                        <p class="uk-text-small uk-margin-remove">
                          (Tu peux editer les arguments pour les faires correspondre avec ta mission.)
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'negociator',

  metaInfo: {
    title: 'Negocier comme un chef'
  },

  data () {
    return {
      rangeValueDuration: 1,
      rangeValueRemote: 5,
      calculDuration: 0,
      calculRemote: 0,
      calculTechnos: 0,
      calculAvantages: 0,
      technos: ['Git', 'Agile'],
      avantages: [`C'est un nouveau projet / refonte!`],
      durationIsOpen: false,
      remoteIsOpen: false,
      technosIsOpen: false,
      avantagesIsOpen: false,
      duration: `entre <strong>un et deux mois</strong>, pas mal non ?`,
      remote: `<strong>cinq jours</strong>`
    }
  },

  watch: {
    avantages () {
      let result = 0

      if (this.avantages.includes(`C'est un nouveau projet / refonte!`)) {
        result -= 20
      }

      if (this.avantages.includes(`C'est du support d'un site existant`)) {
        result += 20
      }

      if (this.avantages.includes(`C'est un client d'envergure`)) {
        result -= 0
      }

      this.calculAvantages = result
    },

    technos () {
      let result = 0

      if (this.technos.includes('VueJs')) {
        result -= 40
      }

      if (this.technos.includes('JavaScript')) {
        if (this.technos.includes('VueJs')) {
          result -= 0
        } else {
          result -= 40
        }
      }

      if (this.technos.includes('React')) {
        result += 40
      }

      if (this.technos.includes('Angular')) {
        result += 80
      }

      if (this.technos.includes('Git')) {
        result += 0
      }

      if (this.technos.includes('Agile')) {
        result += 0
      }

      this.calculTechnos = result
    },

    rangeValueRemote () {
      let remote = ''

      switch (this.rangeValueRemote) {
        case '2': {
          remote = `<strong>deux jours</strong>`
          this.calculRemote = 120
          break
        }
        case '3': {
          remote = `<strong>trois jours</strong>`
          this.calculRemote = 80
          break
        }
        case '4': {
          remote = `<strong>quatre jours</strong>`
          this.calculRemote = 40
          break
        }
        case '5': {
          remote = `<strong>cinq jours</strong>`
          this.calculRemote = 0
          break
        }
        default: {
          remote = `<strong>cinq jours</strong>`
          this.calculRemote = 0
          break
        }
      }

      this.remote = remote
    },

    rangeValueDuration () {
      let duration = ''

      switch (this.rangeValueDuration) {
        case '0': {
          duration = `de moins d'<strong>un mois</strong>...`
          this.calculDuration = 40
          break
        }
        case '1': {
          duration = `entre <strong>un et deux mois</strong>, pas mal non ?`
          this.calculDuration = 0
          break
        }
        case '2': {
          duration = `entre <strong>deux et trois mois</strong>.`
          this.calculDuration = -40
          break
        }
        case '3': {
          duration = `entre <strong>trois et six mois</strong>!`
          this.calculDuration = -80
          break
        }
        case '4': {
          duration = `de <strong>plus de 6 mois</strong>!! Malade!!`
          this.calculDuration = -120
          break
        }
        default: {
          duration = `entre <strong>un et deux mois</strong>, pas mal non ?`
          this.calculDuration = 0
          break
        }
      }

      this.duration = duration
    }
  },

  computed: {
    tjm () {
      let newTJM = 540

      newTJM += this.calculDuration
      newTJM += this.calculRemote
      newTJM += this.calculTechnos
      newTJM += this.calculAvantages

      if (newTJM <= 400) {
        newTJM = 400
      }

      return newTJM
    }
  },

  methods: {
  }
}
</script>
