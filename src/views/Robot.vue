<template>
  <div class="robot">
    <div class="uk-container uk-container">
        <div class="uk-card uk-card-small uk-card-body" ref="container">
          <!--<Chat
            :DATAUSER="blocs['id13']"
            :resultQst="resultQst"
            type="me"
          />-->
          <template v-for="(child, i) in children">
              <component :is="child.name" :DATAUSER="blocs[child.id]" :txt="child.txt" :resultQst="resultQst" :type="child.type" :key="i"></component>
          </template>
        </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Chat from '@/components/Chat.vue'
import { EventBus } from '../event-bus.js'

export default {
  name: 'Robot',

  components: {
    Chat
  },

  metaInfo: {
    title: 'ROBOT'
  },

  mounted () {
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

      for (let i in this.blocs['id13'].btn) {
        fuzz.add(`${this.blocs['id13'].btn[i].val}###${this.blocs['id13'].btn[i].go}`)
      }

      let result = []
      result = fuzz.get(inputValue, null, .005)

      if (result !== null) {
        result.forEach(function(element) {
          var words = element[1].split('###');

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
      newChat.id = `${goToID}`
      newChat.type = 'me'
      this.children.push(newChat)
      this.resultQst = []
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
          txt: `<p class="uk-margin-remove-bottom">Si je comprends bien tu es intéressé par mon profil ou bien alors cherches-tu peut-être à savoir un peu plus sur mes compétences? 🚀</p>`,
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
                <p>Il y a de fortes chances que votre mission me corresponde.</p>
                <p class="uk-margin-remove-bottom">Aussi je vous partage mon email <a href="mailto:constraintsolver@gmail.com">constraintsolver@gmail.com</a> et retrouvons nous autour d'un café ☕.</p>`
        },
        'id09': {
          txt: `<p class="uk-margin-remove-bottom">Merci !</p>`
        },
        'id10': {
          txt: `<p>😞 Je suis navré que mon profil ne soit pas adapté à cette mission.</p>
                  <p><img class="uk-border-rounded" src='./img/chatbot/sad.gif' /></p>
                  <p class="uk-margin-remove-bottom">N'hésitez pas à me contacter s'il y a du changement !</p>`
        },
        'id11': {
          txt: `<p>Oh, tu trouveras tout ce que tu souhaites savoir à mon sujet en allant sur <a class="uk-text-primary" href="http://linkedin.com/in/tdesfossez" target="_blank">mon Linkedin</a></p>
                  <p>Tu peux aussi regarder <a href="https://www.thomas-desfossez.com/#/realisations" class="uk-text-primary" target="_blank">mes réalisations</a></p>
                  <p class="uk-margin-remove-bottom">Tu peux aussi jeteer un oeil à <a href="https://www.thomas-desfossez.com/#/expertise" class="uk-text-primary" target="_blank">mes compétences</a></p>`,
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
          txt: `<p><img class="uk-border-rounded" src='./img/chatbot/chat-chouette.gif' /></p>
                <p class="uk-margin-remove-bottom">Très bien, quel sujet aimerais-tu aborder ?</p>`,
          btn: [
            {
              val: `Technique général`,
              go: `id13`
            },
            {
              val: `Personnel`,
              go: `id14`
            },
            {
              val: `Conditions de travail`,
              go: `id16`
            },
            {
              val: `C'est tout bon pour moi`,
              go: `id03`
            }
          ]
        },
        'id13': {
          txt: `<p class="uk-margin-remove-bottom">Surprenez-moi!</p>`,
          btn: [
            {
              val: `Qu'avez-vous appris cette semaine ?`,
              go: `id13a`
            },
            {
              val: `Qu'est ce qui vous motive où vous intéresse dans le développement ?`,
              go: `id13b`
            },
            {
              val: `Quel a été le dernier défi technique que vous avez expérimenté et comment l'avez-vous résolu ?`,
              go: `id13c`
            },
            {
              val: `Quelles considérations en terme d'UI, Sécurité, Performance, SEO, Maintenabilité ou Technologie faites-vous lorsque vous concevez une application web ou site ?`,
              go: `id13d`
            },
            {
              val: `Parlez-moi de votre environnement de travail préféré.`,
              go: `id13e`
            },
            {
              val: `Avec quels logiciels de gestion de versions êtes-vous familier?`,
              go: `id13f`
            },
            {
              val: `Pouvez-vous décrire comment vous travaillez (votre workflow) lorsque vous créez une page web ?`,
              go: `id13g`
            },
            {
              val: `Comment optimisez-vous les performances de vos pages web (assets/ressources) ?`,
              go: `id13h`
            },
            {
              val: `Donnez 3 façons qui permettent de réduire le temps de chargement d'une page (perçu ou réel).`,
              go: `id13i`
            },
            {
              val: `Quels outils utilisez-vous pour tester la performance de votre code ?`,
              go: `id13j`
            },
            {
              val: `Si vous pouviez maîtriser parfaitement une technologie cette année, laquelle serait-elle ?`,
              go: `id13k`
            },
            {
              val: `Expliquez ce que sont ARIA et les lecteurs d'écrans, et comment rendre votre site internet accessible`,
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
            }
          ]
        },
        'id15': {
          txt: `<p class="uk-margin-remove-bottom">Une autre question ?</p>`,
          btn: [
            {
              val: `Oui, sur le même sujet.`,
              go: `id13`
            },
            {
              val: `Oui, mais sur un autre sujet.`,
              go: `id12`
            },
            {
              val: `non merci, ce sera tout.`,
              go: `id11a`
            }
          ]
        },
        'id15b': {
          txt: `<p class="uk-margin-remove-bottom">Une autre question ?</p>`,
          btn: [
            {
              val: `Oui, sur le même sujet.`,
              go: `id14`
            },
            {
              val: `Oui, mais sur un autre sujet.`,
              go: `id12`
            },
            {
              val: `non merci, ce sera tout.`,
              go: `id11a`
            }
          ]
        },
        'id15c': {
          txt: `<p class="uk-margin-remove-bottom">Une autre question ?</p>`,
          btn: [
            {
              val: `Oui, sur le même sujet.`,
              go: `id16`
            },
            {
              val: `Oui, mais sur un autre sujet.`,
              go: `id12`
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
        'id14': {
          txt: `<p class="uk-margin-remove-bottom">Pas trop personnel j'espère!</p>`,
          btn: [
            {
              val: `Quel est ton statut au Canada et en France ?`,
              go: `id14a`
            },
            {
              val: `Joues-tu aux jeux vidéo ?`,
              go: `id14b`
            },
            {
              val: `Do you speak english ?`,
              go: `id14c`
            }
          ]
        },
        'id14a': {
          txt: `<p class="uk-margin-remove-bottom">Je suis franco-canadien :) Toutefois, après 10 années au Canada, ma famille et moi-même sommes retournées nous installer en France, proche de Lyon.</p>`,
          go: `id15b`
        },
        'id14b': {
          txt: `<p class="uk-margin-remove-bottom">Je suis papa de deux filles depuis 2015, c'est à cette date que mon expérience avec les jeux vidéo a pris fin.</p>`,
          go: `id15b`
        },
        'id14c': {
          txt: `<p class="uk-margin-remove-bottom">I can keep a conversation without difficulty nevertheless my english is not fluent.</p>`,
          go: `id15b`
        },
        'id16': {
          txt: `<p class="uk-margin-remove-bottom">🧐 humm, enfin un peu de serieux</p>`,
          btn: [
            {
              val: `Freelance Vs CDI ?`,
              go: `id16a`
            },
            {
              val: `Télètravail ?`,
              go: `id16b`
            },
            {
              val: `TJM négociable ?`,
              go: `id16c`
            }
          ]
        },
        'id16a': {
          txt: `<p class="uk-margin-remove-bottom">J'ai 10 ans d'experiences en CDI, il est temps pour moi de tenter le freelance. Pour le moment je garde le cap!</p>`,
          go: `id15c`
        },
        'id16b': {
          txt: `<a>Hey!, j'ai dédié <a href="https://www.thomas-desfossez.com/#/remote" target="_blank" >une page à ce sujet</a></p>
                <p class="uk-margin-remove-bottom">Néanmoins, sachez que je peux accepter un déplacement au besoin chez le client.</p>`,
          go: `id15c`
        },
        'id16c': {
          txt: `<p class="uk-margin-remove-bottom">Totalement! Suivant les conditions de travail, si j'aime le projet, si celui-ci est sur plusieurs mois...</p>`,
          go: `id15c`
        }
      }
    }
  },

  data () {
    return {
      dataUser: {
        name: '',
        email: ''
      },

      resultQst: [],

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
