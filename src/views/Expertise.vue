<template>
  <div class="expertise">
    <div class="uk-container uk-container-expand uk-margin-large-top uk-margin-large-bottom">
      <div class="uk-child-width-expand@s uk-grid-divider" uk-grid>
        <div>
          <h1 class="uk-heading-primary">
            Mes compétences 2019
          </h1>

          <p class="uk-margin-medium-bottom">
            Jetez aussi un oeil à mes <router-link to="/realisations">réalisations !</router-link>
          </p>

          <Expertise
            v-for     =" (exp, i) in expertisesFiltered"
            :key      ="'Expertise'+exp.title+i"
            :title    ="exp.title"
            :text     ="exp.text"
            :progress ="exp.progress"
          />
        </div>

        <div>
          <h2>
            Rechercher une compétence
          </h2>

          <input type="search" v-model="inputSearch" class="uk-input" placeholder="Rechercher">

          <hr>

          <h2>
            Mes expériences professionnelles
          </h2>

          <Experience
            v-for =" (exp, i) in experiences"
            :key  ="'Experience'+i"
            :date  ="exp.date"
            :title ="exp.title"
          />

          <hr />

          <h2>
            Mes formations et Certifications
          </h2>

          <Formation
            v-for =" (form, i) in formations"
            :key  ="'Formation'+i"
            :data ="form"
          />

          <hr />

          <h2>
            Reconnaissances
          </h2>

          <Recognition
            v-for =" (reco, i) in recognitions"
            :key  ="'Recognition'+i"
            :text ="reco"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Expertise from '../components/Expertise'
import Experience from '../components/Experience'
import Formation from '../components/Formation'
import Recognition from '../components/Recognition'

export default {
  name: 'chatbot',

  components: {
    Expertise,
    Experience,
    Formation,
    Recognition
  },

  computed: {
    expertisesFiltered () {
      let filtered = this.expertises

      filtered = this.expertises.filter(
        m => m.title.toLowerCase().indexOf(this.inputSearch) > -1
      )

      return filtered
    }
  },

  data () {
    return {
      inputSearch: '',

      recognitions: [
        `Prix Boomerang pour fondsftq.com/fr-ca/particuliers`,
        `Prix Boomerang pour corpo.metro.ca`,
        `Prix Boomerang pour App St-Hubert`,
        `Prix Boomerang pour Desjardins Monetico`,
        `Grand prix Boomerang pour AMT`,
        `Élu Président de l'organisme W3Québec`
      ],

      formations: [
        {
          year: `2019`,
          items: [
            `Build Your First  Vue.js App by Anthony Gore`,
            `Service Workies - Progressive Web App`,
            `Frontend Developer Love Conference - Amsterdam, feb 13th`,
            `VueJs Conference - Amsterdam, feb 14th & 15th 2019`
          ]
        },
        {
          year: `2018`,
          items: [
            `Formation Développement Moderne javascript et ES6, ES7`,
            `Formation javascript débarque dans votre naviguateur`
          ]
        },
        {
          year: `2017`,
          items: [
            `Sitecore® Web Experience Management eLearning`
          ]
        },
        {
          year: `2015`,
          items: [
            `Formation Angular Academy`
          ]
        },
        {
          year: `2013`,
          items: [
            `Formation Accessibilité`
          ]
        },
        {
          year: `2006 - 2009`,
          items: [
            `Haute École Albert jacquard - Namur - Belgique`
          ]
        },
        {
          year: `2006`,
          items: [
            `Bac en Art appliqué avec mention et distinction du Jury`
          ]
        }
      ],

      experiences: [
        {
          date: `2018 - aujourd'hui`,
          title: `Freelance - Développeur Frontend Senior`
        },
        {
          date: `2017 - 2018`,
          title: `Agence Nexio - Team Lead front-end`
        },
        {
          date: `2013 - 2017`,
          title: `Agence Tink - Développeur Frontend Senior`
        },
        {
          date: `2012 - 2013`,
          title: `Agence Altimax - Chargé de projet web`
        },
        {
          date: `2009 - 2012`,
          title: `Agence Cidma - Designer / Intégrateur`
        },
        {
          date: `2008 - 2009`,
          title: `Constraintsolver - Animateur 3D / Web`
        }
      ],

      expertises: [
        {
          title: `HTML5`,
          text: `Hey, saviez-vous que la balise &lt;head&gt; n'est pas obligatoire en HTML5 ? ...non? ...Moi oui ;).`,
          progress: 95
        },
        {
          title: `SCSS / SASS / CSS3`,
          text: `J'ai animé une formation sur le SCSS avec le MeetUp HTML5Mtl.`,
          progress: 90
        },
        {
          title: `Accessibilité`,
          text: `L'accessibilité ce n'est pas juste des balises 'aria', c'est aussi la sensibilité de se mettre dans la peau d'une personne porteuse d'un handicap.`,
          progress: 95
        },
        {
          title: `jQuery`,
          text: `Aussi loin que je me souvienne, j'ai débuté avec jQuery, toutefois me voila familiarisé avec javaScript ES6.`,
          progress: 80
        },
        {
          title: `javaScript / ECMAScript 6/7...`,
          text: `C'est un vrai plaisir de coder en ES6 guidé par ESLINT avec des arrow function et sans les points virgules.`,
          progress: 70
        },
        {
          title: `Vue`,
          text: `J'ai récemment terminé une mission en Vue pour un client, c'est un framework que j'adore ♥ <br /> Pour info, mon portfolio est en Vue et la web app de ma conjointe, <a target='_blank' rel='noopener noreferrer' href='https://www.dyscatalog.com/'> Dyscatalog </a> également.`,
          progress: 95
        },
        {
          title: `React`,
          text: `J'ai réalisé plusieurs projets perso en React avec diverses librairies dont le générateur de site: Gatsby <br> Je n'ai rien contre React, c'est juste que mes neurones sont pour le moment réservés à Vue.`,
          progress: 50
        },
        {
          title: `Angular`,
          text: `J'ai eu une formation de la Angular Academy, toutefois, je pense avoir été traumatisé par ce framework...<br /> C'est pourquoi je porte dans mon coeur Vue.`,
          progress: 25
        },
        {
          title: `WebApp`,
          text: `C'est une belle découverte pour moi, et je dois encore comprendre certains mystères sur la gestion des caches, mais le fait de pouvoir faire des Notifications en Push est vraiment hot!`,
          progress: 60
        },
        {
          title: `Photoshop / Illustrator`,
          text: `Je sais comment optimiser un SVG dans illustrator (Pathfinder...). <br /> Je suis très à l'aise avec Photoshop aussi.`,
          progress: 90
        },
        {
          title: `Optimisation / Performance`,
          text: `Ma plus grande fierté: transformer un fichier CSS de 2Go à 200Ko.`,
          progress: 70
        },
        {
          title: `CMS, Liferay, Drupal, Wordpress, Joomla, Sitecore, Orchard...`,
          text: `Bon, après le 5 <sup>e</sup> CMS, on finit par tous les connaître.`,
          progress: 80
        },
        {
          title: `Agile / JIRA / VSTS`,
          text: `J'ai suivi plusieurs formations / conférences d'agilité et j'aime les débats interminables sur la définition d'un daily Scrum.`,
          progress: 80
        },
        {
          title: `GIT / GitLab`,
          text: `Du moment qu'on me donne le workflow pour le projet, je l'appliquerai à la lettre. <br /> Évidemment, j'utilise GIT aussi pour mes projets personnels.`,
          progress: 65
        },
        {
          title: `Gulp / Webpack`,
          text: `J'adore monter les tâches automatisées avec Gulp, c'est récréatif! <br /> Webpack est moins intuitif pour moi, mais j'y suis familier.`,
          progress: 85
        },
        {
          title: `Gestion de projet / Team Lead`,
          text: `Faire des formations, partager mes connaissances, maintenir la flamme de l'apprentissage...<br /> Evaluer/estimer les récits, distribuer les tâches en fonction des ressources... <br /> Mais surtout, avoir de l'empathie!`,
          progress: 85
        },
        {
          title: `Anglais`,
          text: `Mon anglais technique est très bon, la compréhension et la lecture surtout. <br /> Mon écrit et mon parlé manquent un peu d'assurance toutefois.`,
          progress: 70
        }
      ]
    }
  },

  metaInfo: {
    title: 'Mon expertise'
  }
}
</script>
