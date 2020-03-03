<template>
  <div class="expertise">
    <div class="uk-container uk-container-expand uk-margin-large-top uk-margin-large-bottom">
      <div class="uk-child-width-expand@s uk-grid-divider" uk-grid>
        <div>
          <h1 class="uk-heading-primary">
            {{ t('Mes compétences 2019') }}
          </h1>

          <p class="uk-margin-medium-bottom">
            {{ t('Jetez aussi un oeil à mes ') }}<router-link to="/realisations">{{ t('réalisations !') }}</router-link>
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
            {{ t('Rechercher une compétence') }}
          </h2>

          <input type="search" v-model="inputSearch" class="uk-input" :placeholder="t('Rechercher')">

          <hr>

          <h2>
            {{ t('Mes expériences professionnelles') }}
          </h2>

          <Experience
            v-for =" (exp, i) in experiences"
            :key  ="'Experience'+i"
            :date  ="exp.date"
            :title ="exp.title"
          />

          <hr />

          <h2>
            {{ t('Mes formations et certifications') }}
          </h2>

          <Formation
            v-for =" (form, i) in formations"
            :key  ="'Formation'+i"
            :data ="form"
          />

          <hr />

          <h2>
            {{ t('Reconnaissances') }}
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
    expertises () {
      return [
        {
          title: `HTML5`,
          text: this.$translate.text('HTML5_Text'),
          progress: 95
        },
        {
          title: `SCSS / SASS / CSS3`,
          text: this.$translate.text('SCSS_Text'),
          progress: 90
        },
        {
          title: this.$translate.text('Accessibilité'),
          text: this.$translate.text('Accessibilité_Text'),
          progress: 95
        },
        {
          title: `jQuery`,
          text: this.$translate.text('jQuery_Text'),
          progress: 80
        },
        {
          title: `javaScript / ECMAScript 6/7...`,
          text: this.$translate.text('javaScript_Text'),
          progress: 70
        },
        {
          title: `Vue`,
          text: this.$translate.text('Vue_Text'),
          progress: 95
        },
        {
          title: `React`,
          text: this.$translate.text('React_Text'),
          progress: 50
        },
        {
          title: `Angular`,
          text: this.$translate.text('Angular_Text'),
          progress: 25
        },
        {
          title: `WebApp`,
          text: this.$translate.text('WebApp_Text'),
          progress: 60
        },
        {
          title: `Photoshop / Illustrator`,
          text: this.$translate.text('Photoshop_Text'),
          progress: 90
        },
        {
          title: this.$translate.text('Optimisation / Performance'),
          text: this.$translate.text('Optimisation_Text'),
          progress: 70
        },
        {
          title: `CMS, Liferay, Drupal, Wordpress, Joomla, Sitecore, Orchard...`,
          text: this.$translate.text('CMS_Text'),
          progress: 80
        },
        {
          title: `Agile / JIRA / VSTS`,
          text: this.$translate.text('Agile_Text'),
          progress: 80
        },
        {
          title: `GIT / GitLab`,
          text: this.$translate.text('GIT_Text'),
          progress: 65
        },
        {
          title: `Gulp / Webpack`,
          text: this.$translate.text('Gulp_Text'),
          progress: 85
        },
        {
          title: this.$translate.text('Gestion de projet / Team Lead'),
          text: this.$translate.text('Gestion_Text'),
          progress: 85
        },
        {
          title: this.$translate.text('Anglais'),
          text: this.$translate.text('Anglais_Text'),
          progress: 70
        }
      ]
    },

    experiences () {
      return [
        {
          date: this.$translate.text('2018'),
          title: `Freelance - Senior Front-End Web Developer`
        },
        {
          date: `2017 - 2018`,
          title: `Agence Nexio - Team Lead front-end`
        },
        {
          date: `2013 - 2017`,
          title: `Agence Tink - Senior Front-End Web Developer`
        },
        {
          date: `2012 - 2013`,
          title: this.$translate.text('2012_Text')
        },
        {
          date: `2009 - 2012`,
          title: this.$translate.text('2009_Text')
        },
        {
          date: `2008 - 2009`,
          title: this.$translate.text('2008_Text')
        }
      ]
    },

    formations () {
      return [
        {
          year: `2019`,
          items: [
            `Vue JS 2 - The complete Guide (incl. Vue Router & Vuex) by Maximilian Schwarzmüller`,
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
      ]
    },

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
        this.$translate.text('Prix Boomerang pour fondsftq.com/fr-ca/particuliers'),
        this.$translate.text('Prix Boomerang pour corpo.metro.ca'),
        this.$translate.text('Prix Boomerang pour App St-Hubert'),
        this.$translate.text('Prix Boomerang pour Desjardins Monetico'),
        this.$translate.text('Grand prix Boomerang pour AMT'),
        this.$translate.text('W3Québec')
      ]
    }
  },

  metaInfo: {
    title: 'Mon expertise'
  },

  locales: {
    en: {
      'Rechercher': 'Search',
      'Mes compétences 2019': 'My 2019 skills',
      'Jetez aussi un oeil à mes ': 'Also take a look at my ',
      'réalisations !': 'achievements',
      'Rechercher une compétence': 'Find a skill',
      'Mes expériences professionnelles': 'My professionnal experience',
      'Mes formations et certifications': 'My training and certifications',
      'Reconnaissances': 'Recognitions',
      'HTML5_Text': `Hey, did you know that the head tag isn't mandatory in HTML5? ...no? ...I did ;).`,
      'SCSS_Text': `I conducted a training about SCSS with the HTML5Mtl MeetUp.`,
      'Accessibilité_Text': `Accessibility is not just 'aria' tags, it is also the sensitivity of putting yourself in the shoes of a person with a disability.`,
      'jQuery_Text': `As far as I remember, I started with jQuery, however here I am familiar with javaScript ES6.`,
      'javaScript_Text': `It's a real pleasure to code in ES6 guided by ESLINT with arrow function and without semicolons.`,
      'Vue_Text': `My latest missions are all in Vue, it's a framework I love ♥ <br /> For info, my portfolio is in Sight.`,
      'React_Text': `I've done several personal projects in React with various libraries including Gatsby.<br>I have nothing against React, it's just that my neurons are currently reserved for Vue.`,
      'Angular_Text': `I trained at Angular Academy, however, I think I was traumatized by this framework...<br /> That's why I carry in my heart Vue.`,
      'WebApp_Text': `This is a great discovery for me, and I still need to understand some of the mysteries of cache management, but being able to do Push Notifications is really hot!`,
      'Photoshop_Text': `I know how to optimize an SVG in illustrator (Pathfinder...).  <br /> I'm very comfortable with Photoshop too.`,
      'Optimisation_Text': `My greatest pride: transforming a CSS file from 2Gb to 200Kb.`,
      'CMS_Text': `Well, after the fifth CMS, you get to know them all.`,
      'Agile_Text': `I have attended several agility trainings / conferences and I love the endless debates on the definition of a Daily Scrum.`,
      'GIT_Text': `As long as I'm given the workflow for the project, I'll apply it to the letter.<br />Of course, I use GIT for my personal projects as well.`,
      'Gulp_Text': `I love setting up automated tasks with Gulp, it's fun! <br /> Webpack is less intuitive for me, but I'm familiar with it.`,
      'Gestion_Text': `Doing training courses, sharing my knowledge, keeping the flame of learning burning...<br /> Evaluating/assessing stories, distributing tasks according to resources... <br /> Above all, have empathy!`,
      'Anglais_Text': `My technical English is very good, especially comprehension and reading. <br /> My writing and speaking, however, is a little insecure.`,
      'Accessibilité': `Accessibility`,
      'Optimisation / Performance': `Optimization / Performance`,
      'Gestion de projet / Team Lead': `Project Management / Team Lead`,
      'Anglais': `English`,
      '2018': `2018 - today`,
      '2012_Text': `Agence Altimax - Web Project Manager`,
      '2009_Text': `Agence Cidma - Designer / Integrator`,
      '2008_Text': `Constraintsolver - 3D animator / Web`,
      'Prix Boomerang pour fondsftq.com/fr-ca/particuliers': 'Boomerang Award for fondsftq.com/fr-ca/particuliers',
      'Prix Boomerang pour corpo.metro.ca': 'Boomerang Award for corpo.metro.ca',
      'Prix Boomerang pour App St-Hubert': 'Boomerang Award for App St-Hubert',
      'Prix Boomerang pour Desjardins Monetico': 'Boomerang Award for Desjardins Monetico',
      'Grand prix Boomerang pour AMT': 'Boomerang Grand Prix for AMT',
      'W3Québec': `Elected President of W3Québec`
    },

    fr: {
      'HTML5_Text': `Hey, saviez-vous que la balise &lt;head&gt; n'est pas obligatoire en HTML5 ? ...non? ...Moi oui ;).`,
      'SCSS_Text': `J'ai animé une formation sur le SCSS avec le MeetUp HTML5Mtl.`,
      'Accessibilité_Text': `L'accessibilité ce n'est pas juste des balises 'aria', c'est aussi la sensibilité de se mettre dans la peau d'une personne porteuse d'un handicap.`,
      'jQuery_Text': `Aussi loin que je me souvienne, j'ai débuté avec jQuery, toutefois me voila familiarisé avec javaScript ES6.`,
      'javaScript_Text': `C'est un vrai plaisir de coder en ES6 guidé par ESLINT avec des arrow function et sans les points virgules.`,
      'Vue_Text': `Mes dernières missions sont tous en Vue, c'est un framework que j'adore ♥ <br /> Pour info, mon portfolio est en Vue.`,
      'React_Text': `J'ai réalisé plusieurs projets perso en React avec diverses librairies dont le générateur de site: Gatsby <br> Je n'ai rien contre React, c'est juste que mes neurones sont pour le moment réservés à Vue.`,
      'Angular_Text': `J'ai eu une formation de la Angular Academy, toutefois, je pense avoir été traumatisé par ce framework...<br /> C'est pourquoi je porte dans mon coeur Vue.`,
      'WebApp_Text': `C'est une belle découverte pour moi, et je dois encore comprendre certains mystères sur la gestion des caches, mais le fait de pouvoir faire des Notifications en Push est vraiment hot!`,
      'Photoshop_Text': `Je sais comment optimiser un SVG dans illustrator (Pathfinder...). <br /> Je suis très à l'aise avec Photoshop aussi.`,
      'Optimisation_Text': `Ma plus grande fierté: transformer un fichier CSS de 2Go à 200Ko.`,
      'CMS_Text': `Bon, après le 5 <sup>e</sup> CMS, on finit par tous les connaître.`,
      'Agile_Text': `J'ai suivi plusieurs formations / conférences d'agilité et j'aime les débats interminables sur la définition d'un daily Scrum.`,
      'GIT_Text': `Du moment qu'on me donne le workflow pour le projet, je l'appliquerai à la lettre. <br /> Évidemment, j'utilise GIT aussi pour mes projets personnels.`,
      'Gulp_Text': `J'adore monter les tâches automatisées avec Gulp, c'est récréatif! <br /> Webpack est moins intuitif pour moi, mais j'y suis familier.`,
      'Gestion_Text': `Faire des formations, partager mes connaissances, maintenir la flamme de l'apprentissage...<br /> Evaluer/estimer les récits, distribuer les tâches en fonction des ressources... <br /> Mais surtout, avoir de l'empathie!`,
      'Anglais_Text': `Mon anglais technique est très bon, la compréhension et la lecture surtout. <br /> Mon écrit et mon parlé manquent un peu d'assurance toutefois.`,
      '2018': `2018 - aujourd'hui`,
      '2012_Text': `Agence Altimax - Chef de projet Web`,
      '2009_Text': `Agence Cidma - Designer / Intégrateur`,
      '2008_Text': `Constraintsolver - Animateur 3D / Web`,
      'W3Québec': `Élu Président de l'organisme W3Québec`
    }
  }
}
</script>
