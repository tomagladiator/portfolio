<template>
  <div class="robot">
    <div class="uk-container uk-container">
        <div class="uk-card uk-card-small uk-card-body" ref="container">
          <template v-for="(child, i) in children">
              <component :is="child.name" :DATAUSER="blocs[child.id]" :txt="child.txt" :resultQst="resultQst" :type="child.type" :key="i" :currentId="child.id" :lastId="lastId"></component>
          </template>
        </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Chat from '@/components/Chat.vue'
import { EventBus } from '../event-bus.js'
import UIkit from 'uikit'

export default {
  name: 'Robot',

  components: {
    Chat
  },

  metaInfo: {
    title: 'ROBOT'
  },
      
  mounted () {
    EventBus.$on('success', customMessage => {
      if (!this.success.includes(customMessage)) {
        this.successNumber++
        this.success.push(customMessage)
        UIkit.notification({ message: `🏆 Succès ${this.successNumber}/4 - ${customMessage}`, pos: 'bottom-right' })
      }

      if (this.successNumber === 4) {
        UIkit.notification({ message: `⭐⭐ Bravo, vous avez gagné mon respect! ⭐⭐`, pos: 'bottom-right' })
      }
    })

    EventBus.$on('goBack', currentId => {
      this.goTo(currentId)
    })

    EventBus.$on('getQst', inputValue => {
      this.getQst(inputValue)
    })

    EventBus.$on('userFeedback', userText => {
      this.userFeedback(userText)
    })

    EventBus.$on('goTo', goToID => {
      this.goTo(goToID)
    })

    EventBus.$on('inputEvent', value => {
      // ex: { name: 'Pierre' }

      let keyUser
      let valueUser

      for (var i in value) {
        keyUser = i
        valueUser = value[i]
      }

      this.dataUser[keyUser] = valueUser
    })
  },

  methods: {
    FuzzySet (arr, useLevenshtein, gramSizeLower, gramSizeUpper) {
      var fuzzyset = {}

      // default options
      arr = arr || []
      fuzzyset.gramSizeLower = gramSizeLower || 2
      fuzzyset.gramSizeUpper = gramSizeUpper || 3
      fuzzyset.useLevenshtein = (typeof useLevenshtein !== 'boolean') ? true : useLevenshtein

      // define all the object functions and attributes
      fuzzyset.exactSet = {}
      fuzzyset.matchDict = {}
      fuzzyset.items = {}

      // helper functions
      var levenshtein = function(str1, str2) {
          var current = [], prev, value

          for (var i = 0; i <= str2.length; i++)
              for (var j = 0; j <= str1.length; j++) {
              if (i && j)
                  if (str1.charAt(j - 1) === str2.charAt(i - 1))
                  value = prev;
                  else
                  value = Math.min(current[j], current[j - 1], prev) + 1
              else
                  value = i + j

              prev = current[j]
              current[j] = value
              }

          return current.pop()
      };

      // return an edit distance from 0 to 1
      var _distance = function(str1, str2) {
          if (str1 === null && str2 === null) throw 'Trying to compare two null values'
          if (str1 === null || str2 === null) return 0
          str1 = String(str1); str2 = String(str2)

          var distance = levenshtein(str1, str2)
          if (str1.length > str2.length) {
              return 1 - distance / str1.length
          } else {
              return 1 - distance / str2.length
          }
      }
      var _nonWordRe = /[^a-zA-Z0-9\u00C0-\u00FF, ]+/g

      var _iterateGrams = function(value, gramSize) {
          gramSize = gramSize || 2
          var simplified = '-' + value.toLowerCase().replace(_nonWordRe, '') + '-',
              lenDiff = gramSize - simplified.length,
              results = []
          if (lenDiff > 0) {
              for (var i = 0; i < lenDiff; ++i) {
                  simplified += '-'
              }
          }
          for (var i = 0; i < simplified.length - gramSize + 1; ++i) {
              results.push(simplified.slice(i, i + gramSize))
          }
          return results
      }

      var _gramCounter = function(value, gramSize) {
          // return an object where key=gram, value=number of occurrences
          gramSize = gramSize || 2
          var result = {},
              grams = _iterateGrams(value, gramSize),
              i = 0
          for (i; i < grams.length; ++i) {
              if (grams[i] in result) {
                  result[grams[i]] += 1
              } else {
                  result[grams[i]] = 1
              }
          }
          return result
      };

      // the main functions
      fuzzyset.get = function(value, defaultValue, minMatchScore) {
          // check for value in set, returning defaultValue or null if none found
          if (minMatchScore === undefined) {
              minMatchScore = .33
          }
          var result = this._get(value, minMatchScore);
          if (!result && typeof defaultValue !== 'undefined') {
              return defaultValue
          }
          return result
      };

      fuzzyset._get = function(value, minMatchScore) {
          var normalizedValue = this._normalizeStr(value),
              result = this.exactSet[normalizedValue]
          if (result) {
              return [[1, result]]
          }

          var results = []
          // start with high gram size and if there are no results, go to lower gram sizes
          for (var gramSize = this.gramSizeUpper; gramSize >= this.gramSizeLower; --gramSize) {
              results = this.__get(value, gramSize, minMatchScore);
              if (results && results.length > 0) {
                  return results
              }
          }
          return null
      };

      fuzzyset.__get = function(value, gramSize, minMatchScore) {
          var normalizedValue = this._normalizeStr(value),
              matches = {},
              gramCounts = _gramCounter(normalizedValue, gramSize),
              items = this.items[gramSize],
              sumOfSquareGramCounts = 0,
              gram,
              gramCount,
              i,
              index,
              otherGramCount

          for (gram in gramCounts) {
              gramCount = gramCounts[gram]
              sumOfSquareGramCounts += Math.pow(gramCount, 2)
              if (gram in this.matchDict) {
                  for (i = 0; i < this.matchDict[gram].length; ++i) {
                      index = this.matchDict[gram][i][0];
                      otherGramCount = this.matchDict[gram][i][1]
                      if (index in matches) {
                          matches[index] += gramCount * otherGramCount
                      } else {
                          matches[index] = gramCount * otherGramCount
                      }
                  }
              }
          }

          function isEmptyObject(obj) {
              for(var prop in obj) {
                  if(obj.hasOwnProperty(prop))
                      return false
              }
              return true
          }

          if (isEmptyObject(matches)) {
              return null
          }

          var vectorNormal = Math.sqrt(sumOfSquareGramCounts),
              results = [],
              matchScore
          // build a results list of [score, str]
          for (var matchIndex in matches) {
              matchScore = matches[matchIndex]
              results.push([matchScore / (vectorNormal * items[matchIndex][0]), items[matchIndex][1]])
          }
          var sortDescending = function(a, b) {
              if (a[0] < b[0]) {
                  return 1
              } else if (a[0] > b[0]) {
                  return -1
              } else {
                  return 0
              }
          };
          results.sort(sortDescending)
          if (this.useLevenshtein) {
              var newResults = [],
                  endIndex = Math.min(50, results.length)
              // truncate somewhat arbitrarily to 50
              for (var i = 0; i < endIndex; ++i) {
                  newResults.push([_distance(results[i][1], normalizedValue), results[i][1]])
              }
              results = newResults;
              results.sort(sortDescending);
          }
          var newResults = [];
          results.forEach(function(scoreWordPair) {
              if (scoreWordPair[0] >= minMatchScore) {
                  newResults.push([scoreWordPair[0], this.exactSet[scoreWordPair[1]]])
              }
          }.bind(this))
          return newResults
      };

      fuzzyset.add = function(value) {
          var normalizedValue = this._normalizeStr(value);
          if (normalizedValue in this.exactSet) {
              return false
          }

          var i = this.gramSizeLower
          for (i; i < this.gramSizeUpper + 1; ++i) {
              this._add(value, i)
          }
      }

      fuzzyset._add = function(value, gramSize) {
        var normalizedValue = this._normalizeStr(value),
            items = this.items[gramSize] || [],
            index = items.length

        items.push(0)
        var gramCounts = _gramCounter(normalizedValue, gramSize),
            sumOfSquareGramCounts = 0,
            gram, gramCount
        for (gram in gramCounts) {
            gramCount = gramCounts[gram]
            sumOfSquareGramCounts += Math.pow(gramCount, 2)
            if (gram in this.matchDict) {
                this.matchDict[gram].push([index, gramCount])
            } else {
                this.matchDict[gram] = [[index, gramCount]]
            }
        }
        var vectorNormal = Math.sqrt(sumOfSquareGramCounts)
        items[index] = [vectorNormal, normalizedValue]
        this.items[gramSize] = items
        this.exactSet[normalizedValue] = value
      }

      fuzzyset._normalizeStr = function(str) {
        if (Object.prototype.toString.call(str) !== '[object String]') throw 'Must use a string as argument to FuzzySet functions'
        return str.toLowerCase()
      }

      // return length of items in set
      fuzzyset.length = function() {
        var count = 0,
            prop
        for (prop in this.exactSet) {
          if (this.exactSet.hasOwnProperty(prop)) {
            count += 1
          }
        }
        return count
      }

      // return is set is empty
      fuzzyset.isEmpty = function() {
        for (var prop in this.exactSet) {
          if (this.exactSet.hasOwnProperty(prop)) {
            return false
          }
        }
        return true
      }

      // return list of values loaded into set
      fuzzyset.values = function() {
        var values = [],
          prop
        for (prop in this.exactSet) {
          if (this.exactSet.hasOwnProperty(prop)) {
            values.push(this.exactSet[prop])
          }
        }
        return values
      }


      // initialization
      var i = fuzzyset.gramSizeLower
      for (i; i < fuzzyset.gramSizeUpper + 1; ++i) {
        fuzzyset.items[i] = []
      }
      // add all the items to the set
      for (i = 0; i < arr.length; ++i) {
        fuzzyset.add(arr[i])
      }

      return fuzzyset
    },

    getQst (inputValue) {
      let resultQst = []
      let fuzz = this.FuzzySet()
      let result = []

      for (let i in this.blocs['id13'].btn) {
        fuzz.add(`${this.blocs['id13'].btn[i].val}###${this.blocs['id13'].btn[i].go}`)
      }

      result = fuzz.get(inputValue, null, .005)

      if (result !== null) {
        result.forEach(function(element) {
          let words = element[1].split('###');

          resultQst.push({
            val: words[0],
            go: words[1],
            isSelected: 'uk-button-link'
          })
        })
      }

      this.resultQst = resultQst
    },

    userFeedback (userText) {
      let newChat = {}
      newChat.name = 'Chat'
      newChat.id = 'id00'
      newChat.type = 'user'
      newChat.txt = userText
      this.children.push(newChat)
    },

    goTo (goToID) {
      let newChat = {}
      newChat.name = 'Chat'
      newChat.id = goToID
      newChat.type = 'me'
      this.children.push(newChat)
      this.resultQst = []
      this.lastId = goToID
    }
  },

  computed: {
    blocs () {
      return {
        'id00': {},
        'id01': {
          txt: `<p>Bonjour, on commence la conversation ?</p>
                <p class="uk-margin-remove-bottom uk-text-muted">(Aucune crainte, je ne collecte aucune donnée de ces échanges 😇)</p>`,
          btn: [
            {
              val: `ALLONS-Y!`,
              go: `id02`
            }
          ]
        },
        'id02': {
          txt: `<p class="uk-margin-remove-bottom">Si je comprends bien, tu es intéressé par mon profil ou bien alors cherches-tu peut-être à savoir un peu plus sur mes compétences? 🚀</p>`,
          btn: [
            {
              val: `Je suis intéressé par ton profil 👍`,
              go: `id03`
            },
            {
              val: `Tes compétences ?`,
              go: `id11`
            }
          ]
        },
        'id03': {
          txt: `<p>Je suis ravi de l'apprendre! Prenons quelques minutes, j'ai quelques petites questions pour toi ;)</p>
                <p><img class="uk-border-rounded" src='./img/chatbot/chat-batman.gif' /></p>
                <p class="uk-margin-remove-bottom">Au fait, où sont mes manières, je ne me suis pas présenté, je m'appelle Thomas, et toi, quel est ton prénom ? </p>`,
          input: {
            val: `name`,
            go: `id05`
          }
        },
        'id04': {
          txt: `<p class="uk-margin-remove-bottom">Enchanté ${this.dataUser.name}, as-tu un courriel pour que je puisse te joindre au besoin?  ✌️</p>`,
          input: {
            val: `email`,
            go: `id05`
          }
        },
        'id05': {
          txt: `<p>Merci ${this.dataUser.name}.</p>
                <p>Je voulais voir avec toi si je suis TON candidat.🤖</p>
                <p>Vois-tu, je suis maintenant Freelance, je développe exclusivement en télétravail pour du 4jrs semaines (papa garde ses filles le mercredi). </p>
                <p>Je peux toutefois me déplacer occasionnellement si nécessaire (🚌 Lyon, 🚊 Paris, 🚀 Montréal...). </p>
                <p class="uk-margin-remove-bottom">Cela est-il correct pour toi ?</p>`,
          btn: [
            {
              val: `oui ! 👍`,
              go: `id07`
            },
            {
              val: `... non 😢`,
              go: `id10`
            }
          ]
        },
        'id06': {
          txt: `<p class="uk-margin-remove-bottom">Merveilleux! Parlons de la mission 👨‍🚀, qu'en est-il des technologies utilisées ? Tu peux citer les principales ?</p>`,
          input: {
            val: `techno`,
            go: `id07`
          }
        },
        'id07': {
          txt: `<p>Merveilleux ! </p>
                <p>Nous avons presque fini ! 🎷</p>
                <p>Je sous-entends ton souhait de connaitre mon taux journalier.</p>
                <p>Je réalise vos missions à hauteur de 600 euros 💶 la journée. Facturé à la fin de chaque mois.</p>
                <p>Ce TJM est négociable suivant les conditions.</p>
                <pclass="uk-margin-remove-bottom">Est-ce qu'on continue ?</p>`,
          btn: [
            {
              val: `oui ! 👍`,
              go: `id08`
            },
            {
              val: `... non 😢`,
              go: `id10`
            }
          ]
        },
        'id08': {
          txt: `<p>Merci d'avoir pris le temps de répondre à mes questions ${this.dataUser.name}.</p>
                <p>Il y a de fortes chances que ta mission me corresponde.</p>
                <p class="uk-margin-remove-bottom">Aussi je te partage mon email <a href="mailto:constraintsolver@gmail.com">constraintsolver@gmail.com</a> et retrouvons nous autour d'un café ☕.</p>`
        },
        'id09': {
          txt: `<p class="uk-margin-remove-bottom">Merci !</p>`
        },
        'id10': {
          txt: `<p>😞 Je suis navré que mon profil ne soit pas adapté à cette mission.</p>
                  <p><img class="uk-border-rounded" src='./img/chatbot/sad.gif' /></p>
                  <p class="uk-margin-remove-bottom">N'hésites pas à me contacter s'il y a du changement !</p>`
        },
        'id11': {
          txt: `<p>Oh, tu trouveras tout ce que tu souhaites savoir à mon sujet en allant sur <a class="uk-text-primary" href="http://linkedin.com/in/tdesfossez" target="_blank">mon Linkedin</a></p>
                  <p>Tu peux aussi regarder <a href="https://www.thomas-desfossez.com/#/realisations" class="uk-text-primary" target="_blank">mes réalisations</a></p>
                  <p class="uk-margin-remove-bottom">Tu peux aussi jeter un oeil à <a href="https://www.thomas-desfossez.com/#/expertise" class="uk-text-primary" target="_blank">mes compétences</a></p>`,
          go: 'id11a'
        },
        'id11a': {
          txt: `<p class="uk-margin-remove-bottom">Alors que penses-tu de mon profil ? Intéressé ?</p>`,
          btn: [
            {
              val: `oui ! 👍`,
              go: `id03`
            },
            {
              val: `... non 😢`,
              go: `id10`
            },
            {
              val: `J'ai des questions pour toi`,
              go: `id12`
            }
          ]
        },
        'id12': {
          txt: `<p><img class="uk-border-rounded" src='./img/chatbot/chat-chouette.gif' /></p>`,
          go: `id13`
        },
        'id13': {
          txt: `<p class="uk-margin-remove-bottom">Surprenez-moi!</p>`,
          btn: [
            {
              val: `Qu'as tu appris cette semaine ?`,
              go: `id13a`
            },
            {
              val: `Qu'est ce qui te motive où t'intéresse dans le développement ?`,
              go: `id13b`
            },
            {
              val: `Quel a été le dernier défi technique que tu as expérimenté et comment l'as-tu résolu ?`,
              go: `id13c`
            },
            {
              val: `Quelles considérations en terme d'UI, Sécurité, Performance, SEO, Maintenabilité ou Technologie fais-tu lorsque tu conçois une application web ou site ?`,
              go: `id13d`
            },
            {
              val: `Parle-moi de ton environnement de travail préféré.`,
              go: `id13e`
            },
            {
              val: `Avec quels logiciels de gestion de versions es-tu familier?`,
              go: `id13f`
            },
            {
              val: `peux-tu décrire comment tu travailles (ton workflow) lorsque tu créer une page web ?`,
              go: `id13g`
            },
            {
              val: `Comment optimise-tu les performances de tes pages web (assets/ressources) ?`,
              go: `id13h`
            },
            {
              val: `Donnes 3 façons qui permettent de réduire le temps de chargement d'une page (perçu ou réel).`,
              go: `id13i`
            },
            {
              val: `Quel outil utilises-tu pour tester la performance de ton code ?`,
              go: `id13j`
            },
            {
              val: `Si tu peux maîtriser parfaitement une technologie cette année, laquelle serait-elle ?`,
              go: `id13k`
            },
            {
              val: `Explique ce que sont ARIA et les lecteurs d'écrans, et comment rendre ton site internet accessible`,
              go: `id13l`
            },
            {
              val: `Quel est ton niveau en HTML5 ?`,
              go: `id13m`
            },
            {
              val: `Quel est ton niveau en CSS3 ?`,
              go: `id13n`
            },
            {
              val: `Quel est ton niveau en Sass ou Scss ?`,
              go: `id13o`
            },
            {
              val: `As-tu de l'expérience avec AngularJs`,
              go: `id13p`
            },
            {
              val: `As-tu de l'expérience avec React ?`,
              go: `id13q`
            },
            {
              val: `As-tu de l'expérience avec vue ?`,
              go: `id13r`
            },
            {
              val: `Quel est ton expérience avec des frameworks JS / Javascript ?`,
              go: `id13s`
            },
            {
              val: `Avec quel CMS as tu travaillé ?`,
              go: `id13t`
            },
            {
              val: `Quel est ton expérience avec Bootstrap ?`,
              go: `id13u`
            },
            {
              val: `As-tu déja fais des Progressives Web App ?`,
              go: `id13v`
            },
            {
              val: `Quel est ton expérience en matièere d'accéssibilité ?`,
              go: `id13w`
            },
            {
              val: `Combien d'année d'expérience as-tu dans le web ?`,
              go: `id13x`
            },
            {
              val: `Quel est ton expérience avec le CMS Sitecore ?`,
              go: `id13y`
            },
            {
              val: `Quel est ton plus gros succès ?`,
              go: `id13z`
            },
            {
              val: `Quel est ton plus gros echec ? et qu'as-tu appris ?`,
              go: `id13aa`
            },
            {
              val: `Que pensez-vous de la culture de l'entreprise ?`,
              go: `id13ab`
            },
            {
              val: `Utilises-tu GIT comme solution de versioning ?`,
              go: `id13ac`
            },
            {
              val: `Ou te vois-tu dans 5 ans ?`,
              go: `id13ad`
            },
            {
              val: `Quel est ton expérience avec JAVA ?`,
              go: `id13ae`
            },
            {
              val: `Sais-tu parler anglais ?`,
              go: `id13af`
            },
            {
              val: `Quel type d'entreprise recherches-tu ?`,
              go: `id13ag`
            },
            {
              val: `Quel est ton parcours professionnel?`,
              go: `id13ah`
            },
            {
              val: `Quel est ton statut au Canada et en France ?`,
              go: `id14a`
            },
            {
              val: `Joues-tu aux jeux vidéo ?`,
              go: `id14b`
            },
            {
              val: `Do you speak English ?`,
              go: `id14c`
            },
            {
              val: `Où habites-tu ?`,
              go: `id14d`
            }, 
            {
              val: `Salut, Ça va ?`,
              go: `id14e`
            }, 
            {
              val: `En dehors du travail, qu'est-ce qui te passionnes ?`,
              go: `id14f`
            }, 
            {
              val: `Es-tu ouvert à un CDI ?`,
              go: `id16a`
            },
            {
              val: `Pourquoi le télètravail ?`,
              go: `id16b`
            },
            {
              val: `Ton TJM est-il négociable ?`,
              go: `id16c`
            },
            { 
              val: `Quel est ton TJM ?`,
              go: `id16d`
            },
            { 
              val: `Quel sont tes disponibilités ?`,
              go: `id16e`
            },
            { 
              val: `Si trois personnes sont dans une pièce, quelle est la  probabilité qu'au moins deux personnes soient nées le même jour de la semaine?`,
              go: `id17a`
            },
            { 
              val: `Comment expliqueriez-vous le métier de consultant à un enfant de 4 à 6 ans ?`,
              go: `id17b`
            },
            { 
              val: `Que feriez-vous avec 200 000€ ?`,
              go: `id17c`
            }
          ]
        },
        'id15': {
          txt: `<p class="uk-margin-remove-bottom">Une autre question ?</p>`,
          btn: [
            {
              val: `Oui, ça m'amuse.`,
              go: `id13`
            },
            {
              val: `non merci, ce sera tout.`,
              go: `id11a`
            }
          ]
        },
        'id13a': {
          txt: `<p class="uk-margin-remove-bottom">Tellement de choses, je suis l'actualité du web via un agrégateur RSS pour ne rien louper, par la suite, je partage mes découvertes à mes collègues via un channel privé.</p>`,
          go: `id15`
        },
        'id13b': {
          txt: `<p class="uk-margin-remove-bottom">Le développement, c'est tout sauf ennuyeux, la technologie avance très rapidement, c'est incroyable les possibilités que nous pouvons faire en tant que développeurs. J'ai hâte d'apprendre le machine learning par exemple.</p>`,
          go: `id15`
        },
        'id13c': {
          txt: `<p class="uk-margin-remove-bottom">J'ai mis en place des outils pour rendre un site : Progressive Web App, c'est-à- dire qu'il sera perçu par les navigateurs comme une application potentielle et donc pouvant être installé, pouvant être visible off-line et pouvant même envoyer des notifications sur le téléphone par exemple ! J'ai fait pas mal de R&D avant de trouver les meilleures pratiques et j'ai appliqué la solution sur mon portfolio également.</p>`,
          go: `id15`
        },
        'id13d': {
          txt: `<p class="uk-margin-remove-bottom">Une bonne pratique consiste a concevoir une architecture modulaire. De plus, je ne développe plus de site sans Styleguide. Travailler en méthode Agile avec une équipe experte en UI, UX, SEO... permet de livrer un produit solide ! Je n'ai pas peur de remettre en cause le travail de l'UX et de l'UI si cela permet de garantir un site stable.</p>`,
          go: `id15`
        },
        'id13e': {
          txt: `<p class="uk-margin-remove-bottom">Je suis un utilisateur de Windows, non pas par souhait, mais par expérience. J'aime Visual Studio Code et un environnement sous NodeJs. </p>`,
          go: `id15`
        },
        'id13f': {
          txt: `<p class="uk-margin-remove-bottom">J'aime beaucoup VSTS, toutefois j'ai eu aussi beaucoup d’expérience avec GIT.</p>`,
          go: `id15`
        },
        'id13g': {
          txt: `<p class="uk-margin-remove-bottom">Pas facile d'avoir une réponse courte. Disons qu'une fois l'UX et le UI validé (par le client et les dev) je découpe les composants et intègre ceux-ci dans la styleguide en créant un fichier Scss et Js séparé par composant. par la suite, je test l'accessibilité et fais un pré-qa avant le pousser mon code.</p>`,
          go: `id15`
        },
        'id13h': {
          txt: `<p class="uk-margin-remove-bottom">En utilisant la puissance de l'outil Gulp, pour minifier et concaténer les fichiers. Aussi je m'emploi a utiliser de bonnes pratique dans le code pour réduire la taille des CSS à la source, je n'ai pas peur de mettre les mains dans le code généré pour détecter les éléments trop gourmands et faire du ménage.<br>
                J'optimise les images et intègre préconise le SVG. </p>`,
          go: `id15`
        },
        'id13i': {
          txt: `<p class="uk-margin-remove-bottom">Ajout d'un loader (perçu) <br>
                Asynchronisme des js et css<br>
                Ajout d'un Lazyload</p>`,
          go: `id15`
        },
        'id13j': {
          txt: `<p class="uk-margin-remove-bottom">L'outil d'audit de Google Chrome : Lighthouse.</p>`,
          go: `id15`
        },
        'id13k': {
          txt: `<p class="uk-margin-remove-bottom">Vue, sans équivoque.</p>`,
          go: `id15`
        },
        'id13l': {
          txt: `<p class="uk-margin-remove-bottom">Les aria sont des attributs HTML permettant au lecteurs d'écrans de lire des informations pour améliorer l'expérience de navigation des personnes non-voyantes. j'ai une grande expérience en matière d'accessibilité et fait des formations à nos équipes à l'interne et au client pour les sensibiliser à cette norme.</p>`,
          go: `id15`
        },
        'id13m': {
          txt: `<p class="uk-margin-remove-bottom">Très bonne, j'ai une bonne compréhension de la sémantique HTML5 et tous mes sites sont conçus suivant ce standard.</p>`,
          go: `id15`
        },
        'id13n': {
          txt: `<p class="uk-margin-remove-bottom">Le CSS3 n'est pas un mystère pour moi, je fais des animations CSS3 et utilise sans problème les nouveautés tel que Flexbox ou Grid. Je travaille toutefois avec la technologie SCSS (Sass). De plus en plus je commence en utilisant une base tel que Bootstrap ou UIKit.</p>`,
          go: `id15`
        },
        'id13o': {
          txt: `<p class="uk-margin-remove-bottom">Vraiment bonne, je forme mon équipe a cette technologie et utilise le SCSS à tous mes projets suivant l'atomic design.</p>`,
          go: `id15`
        },
        'id13p': {
          txt: `<p class="uk-margin-remove-bottom">J'ai fais des applications en Angular 1.5 jadis, j'ai même obtenu un diplôme de la Angular Academy toutefois, je n'apporte plus d'intérêt pour cette technologie, je préfère React ou Vue.</p>`,
          go: `id15`
        },
        'id13q': {
          txt: `<p class="uk-margin-remove-bottom">J'ai fais quelques formations React et c'est un framework très performant et impressionnant par sa maturité.</p>`,
          go: `id15`
        },
        'id13r': {
          txt: `<p>J'ai dernièrement transformé le site https://www.dyscatalog.com/ qui était en Angular avec Vue, cela m'a prit 7 fois moins de temps!</p>
                <p>J'ai plusieurs projets montés en Vuejs dont ce portfolio.</p>
                <p class="uk-margin-remove-bottom">C'est une technologie que j'apprécie particulièrement pour sa learning curve agréable. ♥</p>`,
          go: `id15`
        },
        'id13s': {
          txt: `<p class="uk-margin-remove-bottom">J'ai goûté et créé des applications perso avec Angular 1.5, Vue 2.0 et React. Mon coup de ♥ pour Vue.</p>`,
          go: `id15`
        },
        'id13t': {
          txt: `<p class="uk-margin-remove-bottom">Avec énormément de CMS : Sitecore, Orchard, Liferay, Joomla, Drupal, Wordpress, EGC, Magento, Shopify... </p>`,
          go: `id15`
        },
        'id13u': {
          txt: `<p class="uk-margin-remove-bottom">Boostrap, UIKit, Bulma, Material Design... autant de framework HTML/CSS qui ont leur avantages, j'ai beaucoup d'expérience avec ces frameworks et suis aussi très à l'aise de partir from scratch.</p>`,
          go: `id15`
        },
        'id13v': {
          txt: `<p class="uk-margin-remove-bottom">Comment ? Tu n'as pas installé mon portfolio sur ton téléphone ? Hey oui, c'est une progressive web app, il est accessible Off-line et je peux envoyer des notifications comme n'importe quelle app. j'ai beaucoup appris à ce sujet récemment. L'avenir s'annonce excitant !</p>`,
          go: `id15`
        },
        'id13w': {
          txt: `<p class="uk-margin-remove-bottom">J'ai été formé lors de la réalisation du site de l'AMT, par la suite j'ai suivi de multiples formations et MeetUp et je forme mon équipe et les clients aux normes d'accessibilités. J'applique l'accessibilité sur tous mes projets.</p>`,
          go: `id15`
        },
        'id13x': {
          txt: `<p class="uk-margin-remove-bottom">J'ai commencé en 2008, je vous laisse le calcul ;)</p>`,
          go: `id15`
        },
        'id13y': {
          txt: `<p>J'ai participé à un projet transactionnel en Sitecore, de plus j'ai eu la formation "Sitecore® Web Experience Management eLearning"</p>
                <p>Le stack technique étant Habitat + Unicorn + Gulp + Bootstrap</p>
                <p class="uk-margin-remove-bottom">Enfin j'ai fais de la R&D avec JSS de Sitecore et VueJS</p>`,
          go: `id15`
        },
        'id13z': {
          txt: `<p>Je ne sais pas si c'est un succès ou plutot une fierté, mais quand le site pour lequel tu as travaillé reçoit un prix c'est une belle récompense</p>
                <p>Le site qui me vient à l'esprit est celui du <a href="https://www.fondsftq.com/fr-ca/particuliers" target="_blank">Fonds FTQ</a></p>
                <p class="uk-margin-remove-bottom">Le projet ayant comme qualité d'avoir une superbe équipe, un client à l'écoute de l'équipe et d'être réellement Agile.</p>`,
          go: `id15`
        },
        'id13aa': {
          txt: `<p>...mmmh</p>
                <p>Dans plusieurs projets, je pense avoir échoué dans le rôle d'avertir le client sur l'importance de rendre un site accessible pour les personnes en handicap.</p>
                <p>Malheureusement, lors des décision des tâches prioritaires, ce point était souvent 'déscopé'.</p>
                <p>Progressivement j'ai appris à lever le flag afin d'alerter le client sur les risques et les pertes qu'engendre un site non-accessible</p>
                <p class="uk-margin-remove-bottom">Maintenant, si cela se réitère, je préfère créer une dette technique et le garder dans le board</p>`,
          go: `id15`
        },
        'id13ab': {
          txt: `<p>C'est un atout pour l'entreprise, je suis convaincu que cela permet de limiter le turnOver des employés</p>
                <p>Toutefois il ne s'agit pas d'après moi d'une qualité que recherche un employé</p>
                <p class="uk-margin-remove-bottom">Pour moi les priorités sont : Une équipe experte, des projets passionants d'un point de vue technique, un salaire attrayant et une conciliation vie personnelle et professionelle</p>`,
          go: `id15`
        },
        'id13ac': {
          txt: `<p>Oui, je l'utilise au quotidien</p>
                <p>Pour être franc, GIT c'est comme notre cerveau, on utilise au quotidien que 10% de ses capacités</p>
                <p class="uk-margin-remove-bottom">Et c'est pas plus mal.</p>`,
          go: `id15`
        },
        'id13ad': {
          txt: `<p>J'espère avoir enménagé dans un plus grand appartement</p>
                <p>Ma grande commancera la pré-ado donc je risque d'avoir moins de cheveux hahaha</p>
                <p class="uk-margin-remove-bottom">J'espère aussi avoir établi une belle confiance avec un réseau de collaborateurs</p>`,
          go: `id15`
        },
        'id13ae': {
          txt: `<p>J'ai travaillé dans de multiples environnements JAVA</p>
                <p>Je ne suis pas particulièrement fan de cet environnement (je préfère .NET)</p>
                <p>Je n'ai pas eu de bonne expérience avec JAVA qui à tendance à compiler la terre entière! hahaha</p>
                <p class="uk-margin-remove-bottom">Toutefois j'avoue que d'un point de vue front-end, le templating Thymeleaf est pas mauvais</p>`,
          go: `id15`
        },
        'id13af': {
          txt: `<p class="uk-margin-remove-bottom">I can keep a conversation without difficulty, I have a good understanding in technical English, nevertheless my English is not fluent.`,
          go: `id15`
        },
        'id13ag': {
          txt: `<p>J'ai eu beaucoup de plaisir à travailler pour de grosses sociétés ayant les moyens financiers et humain pour faire naître leurs projets</p>
                <p>C'est aussi très valorisant de travailler pour ce genre de société</p>
                <p class="uk-margin-remove-bottom">Je suis également friand des sociétés souhaitant se diriger vers un stack technologique moderne</p>`,
          go: `id15`
        },
        'id13ah': {
          txt: `<p>Après mes études en Art et infographie (3D, web, print)</p>
                <p>J'ai pris mon vol vers Montréal en 2009 puisque j'ai reçu un permis de travail d'un an</p>
                <p class="uk-margin-remove-bottom">Dans un premier tant, offrant mes service de travailleur autonome (autoentrepreneur), j'ai réalisé plusieurs site en Joomla orienté SEO (dont le site d'une ambassage, un site de l'ONU...)</p>`,
          go: `id13ai`
        },
        'id13ai': {
          txt: `<p class="uk-margin-remove-bottom">de <b>2009 à 2012</b> j'ai été embauché pour la première fois en tant que Webmaster, j'ai participé à la réalisation de plus d'une trentaine de projets (Joomla, Wordpress ou sites statiques)</p>`,
          go: `id13aj`
        },
        'id13aj': {
          txt: `<p class="uk-margin-remove-bottom">de <b>2012 à 2013</b> je suis rentré en France le temps d'avoir un permis de travail valide pour revenir au Canada. <br> J'ai pris le poste à Annecy de "Chef de projet web". Ce fut très enrichissant, toutefois, coder me manquait...</p>`,
          go: `id13ak`
        },
        'id13ak': {
          txt: `<p class="uk-margin-remove-bottom">de <b>2013 à 2017</b> j'ai rejoint une superbe agence : TINK, j'en garde de très bon souvenirs et de très bons amis. J'ai muris techniquement au sein de cette agence jusqu'au titre de développeur front-end Senior. <br> L'environnement de travail étant principalement JAVA et PHP, j'ai travaillé sur de nombreux CMS (Drupal, Wordpress, Orchard, Liferay... ). </p> `,
          go: `id13al`
        },
        'id13al': {
          txt: `<p class="uk-margin-remove-bottom">de <b>2017 à 2018</b> j'ai quitté Tink pour NEXIO afin d'obtenir un 4jrs / semaines et de devenir "Team Lead front-end", j'ai eu la chance de découvrir un CMS très puissant : Sitecore</p>`,
          go: `id13am`
        },
        'id13am': {
          txt: `<p>de <b>2018 à aujourd'hui</b>, ma famille et moi même sommes retourné nous installer en France en juillet 2018 dans le but de se rapprocher des grands-parents de nos filles.</p>
                <p class="uk-margin-remove-bottom">Je suis freelance en France depuis décembre 2018 :)</p>`,
          go: `id15`
        },
        'id13an': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id13ao': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id13ap': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id13aq': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id13ar': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id13as': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id13at': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id14a': {
          txt: `<p class="uk-margin-remove-bottom">Je suis franco-canadien :) Toutefois, après 10 années au Canada, ma famille et moi-même sommes retournées nous installer en France, proche de Lyon.</p>`,
          go: `id15`
        },
        'id14b': {
          txt: `<p class="uk-margin-remove-bottom">Je suis papa de deux filles depuis 2015, c'est à cette date que mon expérience avec les jeux vidéo a pris fin.</p>`,
          go: `id15`
        },
        'id14c': {
          txt: `<p class="uk-margin-remove-bottom">I can keep a conversation without difficulty, I have a good understanding in technical English, nevertheless my English is not fluent.</p>`,
          go: `id15`
        },
        'id14d': {
          txt: `<p class="uk-margin-remove-bottom">Actuellement à Neuville-sur-Saône, proche de Lyon</p>`,
          go: `id15`
        },
        'id14e': {
          txt: `<p class="uk-margin-remove-bottom">Pas pire merci</p>`,
          go: `id15`
        },
        'id14f': {
          txt: `<p>J'aime les jeux de plateaux</p>
                <p>Au point ou j'organise un évènement mensuel dans ma ville</p>
                <p>J'ai même fait un petit site <a href="https://neuville-sur-board.space/" target="_blank">neuville-sur-board</a> (oui il ressemble à mon site hahaha)</p>
                <p class="uk-margin-remove-bottom">Inscris-toi!</p>`,
          go: `id15`
        },
        'id14g': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id14h': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id16a': {
          txt: `<p class="uk-margin-remove-bottom">J'ai 10 ans d'experiences en CDI, il est temps pour moi de tenter le freelance. Pour le moment je garde le cap!</p>`,
          go: `id15`
        },
        'id16b': {
          txt: `<a>Hey!, j'ai dédié <a href="https://www.thomas-desfossez.com/#/remote" target="_blank" >une page à ce sujet</a></p>
                <p class="uk-margin-remove-bottom">Néanmoins, sachez que je peux accepter un déplacement au besoin chez le client.</p>`,
          go: `id15`
        },
        'id16c': {
          txt: `<p class="uk-margin-remove-bottom">Totalement! Suivant les conditions de travail, si j'aime le projet, si celui-ci est sur plusieurs mois...</p>`,
          go: `id15`
        },
        'id16d': {
          txt: `<p class="uk-margin-remove-bottom">Mon TJM est de 600€ HT (négociable)</p>`,
          go: `id15`
        },
        'id16e': {
          txt: `<p>Je suis disponible en ce moment pour du 4 jours/semaine</p>
                <p class="uk-margin-remove-bottom">(Le mercredi, c'est le jour ou je garde mes filles)</p>`,
          go: `id15`
        },
        'id16f': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id16g': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id16h': {
          txt: `<p>XXXXX</p>
                <p>XXXXX</p>
                <p>XXXXX</p>
                <p class="uk-margin-remove-bottom">XXXXX</p>`,
          go: `id15`
        },
        'id17a': {
          txt: `<p>Soit: Al, Bob et Clovis</p>
                <p>
                  Al peut être né le [Lu, Ma, Me, Je, Ve, Sa, Di] <br>
                  Bob peut être né le [Lu, Ma, Me, Je, Ve, Sa, Di] <br>
                  Clovis peut être né le [Lu, Ma, Me, Je, Ve, Sa, Di] <br>
                  Soit (7 * 7 * 7)
                </p>
                <p>
                  Al peut naitre un des 7 jours <br>
                  Bob peut naitre un des 6 jours restant <br>
                  Clovis peut naitre un des 5 jours restant <br>
                  Soit (7 * 6 * 5)
                </p>
                <p>
                  La probabilité que Al, Bob et Clovis soient nés un jour différent est donc de <br>
                  (7 * 6 * 5) / (7 * 7 * 7) = 210 / 343
                </p>
                <p class="uk-margin-remove-bottom">
                  La probabilité qu'au moins deux soient nés un jour différent est donc de <br>
                  1 - (7 * 6 * 5) / (7 * 7 * 7) <br>
                  Soit environ 38% de chance.
                </p>`,
          go: `id15`
        },
        'id17b': {
          txt: `<p>Comme ma définition sera totallement différente entre un enfant de 4 et un autre de 6 ans, je vais faire pour 5 ans:</p>
                <p>"Tu aimes les croissants Marilou ?</p>
                <p>Imagine que le boulanger tombe malade ou qu'il part longtemps en vacance!! Qui va te faire de bons croissants ??? </p>
                <p>Vois--tu, un consultant, c'est une personne qui accepte de remplacer ce boulanger.</p>
                <p>Il accepte de travailler foOort pour le remplacer et de se déplacer de loin de chez lui parfois...</p>
                <p class="uk-margin-remove-bottom">Il y a des consultants pour les boulangers, mais aussi pour pleins d'autres métiers.
                <br>Tu as compris Marilou?"</p>`,
          go: `id15`
        },
        'id17c': {
          txt: `<p>Désolé cher Thomas de 8 ans que j'étais, je n'utiliserai pas cette somme pour un voyage dans l'espace 👨‍🚀 ...</p>
                <p class="uk-margin-remove-bottom">Ça nous permettra de ne pas negocier un prêt avec la banque pour l'achat de notre nouvel appartement</p>`,
          go: `id15`
        },
      }
    }
  },

  data () {
    return {
      dataUser: {
        name: '',
        email: ''
      },

      lastId: 'id01',

      resultQst: [],

      successNumber: 0,

      success:[],

      children: [
        {
          name: 'Chat',
          id: 'id01',
          type: 'me'
        }
      ]
    }
  }
}
</script>
