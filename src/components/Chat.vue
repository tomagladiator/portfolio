<template>
    <div :id="`chat${uniqueId}`" class="chat" :class="injectedClass">
        <template v-if="this.type === 'user'">
            <div class="uk-flex uk-flex-right">
                <div class="uk-card uk-card-default uk-width-1-2@m this-is-user uk-margin-small-top">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <div class="uk-light uk-margin-remove-top uk-text-right uk-text-small" v-html="txt"></div>
                            </div>
                            <div class="uk-width-auto">
                                <img class="uk-border-circle" width="40" height="40" :src="goodEmoji" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template v-else>
            <div class="uk-flex uk-flex-left">
                <div class="uk-card uk-card-default uk-width-1-2@m uk-margin-small-top">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex uk-flex-between" uk-grid>
                            <div>
                                <img class="uk-border-circle" width="40" height="40" src="../assets/thomas-desfossez-2019.jpg" />
                            </div>
                            <div>
                                <button
                                    v-if   ="showGoBack"
                                    type   ="button"
                                    class  ="uk-button uk-button-default uk-animation-scale-up"
                                    @click ="goBack"
                                    uk-tooltip="Revenir ici"
                                >
                                    <span uk-icon="reply"></span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="uk-card-body">
                        <div class="uk-margin-remove-top uk-text-small" :class="animTxt" v-if="showTxt" v-html="DATAUSER.txt"></div>
                        <div class="wave-dot"  v-if="!showTxt">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>

                    <div class="uk-card-footer" v-if="showFooter" >
                        <div v-if="showInputOnly" class="uk-flex">
                            <input
                                :type        ="customType"
                                ref          ="inputText"
                                class        ="uk-input"
                                value        =""
                                :placeholder ="DATAUSER.input.val"
                                v-model      ="inputValue"
                                :disabled    ="disabled"
                                required
                            />

                            <button
                                type      ="button"
                                :disabled ="disabled"
                                class     ="uk-button uk-button-primary uk-button-small"
                                @click    ="emitValue"
                            >
                                Envoyer
                            </button>
                        </div>

                        <template v-if="showButtonOnly">
                          <button
                              v-for     ="(cta,i) in DATAUSER.btn"
                              :key      ="'btn'+i"
                              type      ="button"
                              :disabled ="disabled"
                              class     ="uk-button uk-button-primary uk-margin-small-right uk-margin-small-bottom uk-button-small"
                              @click    ="emitNext"
                              :value    ="cta.go"
                          >
                              {{cta.val}}
                          </button>
                        </template>

                        <div v-if="showSelectOnly">
                          <div class="uk-inline uk-width-1-1">
                              <span class="uk-form-icon uk-form-icon-flip">?</span>

                              <input
                                type="text"
                                class="uk-input"
                                v-model="inputValue"
                                @keyup="getQst"
                                :disabled="disabled"
                                :placeholder="'Votre question ici'"
                              >
                          </div>

                          <div :id="uniqueId" :style="'top:10px !important'">
                            <button
                                v-for     ="(cta,i) in resultQst"
                                v-if      ="i <= 4"
                                :key      ="'btn'+i"
                                type      ="button"
                                :disabled ="disabled"
                                class     ="uk-button uk-display-block uk-text-lowercase uk-text-left uk-margin-small-right uk-margin-small-bottom uk-button-small"
                                :class    ="cta.isSelected"
                                @click    ="emitNext"
                                :value    ="cta.go"
                            >
                                {{cta.val}}
                            </button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import { EventBus } from '../event-bus.js'
import { VueTyper } from 'vue-typer'
import UIkit from 'uikit'

export default {
  name: 'chat',

  components: {
    VueTyper
  },

  props: {
    DATAUSER: {
      type: Object,
      required: false,
      default: () => {}
    },
    type: {
      type: String,
      required: false,
      default: ''
    },
    resultQst: {
      type: Array,
      required: false,
      default: () => []
    },
    txt: {
      type: String,
      required: false,
      default: ''
    },
    currentId: {
      type: String,
      required: false,
      default: 'id01'
    },
    lastId: {
      type: String,
      required: false,
      default: 'id01'
    }
  },

  data () {
    return {
      injectedClass: '',
      disabled: false,
      inputValue: '',
      showTxt: false,
      animTxt: ''
    }
  },

  computed: {
    goodEmoji () {
      let path = `./img/chatbot/emoji-`
      if (this.lastId === 'id02') {
        return `${path}deal-with-it.gif`
      } else if (this.lastId === `id08`) {
        return `${path}party.gif`
      } else if (this.lastId === `id10`) {
        return `${path}sad.gif`
      } else if (this.lastId === `id13`) {
        return `${path}monocle.gif`
      } else if (this.lastId === `id11a`) {
        return `${path}angel.gif`
      } else if (this.lastId === `id03`) {
        return `${path}surprise.gif`
      } else {
        return `${path}smile.gif`
      }
    },

    uniqueId () {
      const random = Math.floor(Math.random() * 10000)
      return `id${random}`
    },

    showGoBack () {
      if (this.currentId !== 'id01') {
        if (this.currentId !== this.lastId) {
          return true
        }
      } else {
        return false
      }
    },

    showButtonOnly () {
      if (this.DATAUSER.btn === undefined) {
        return false
      }

      if (this.DATAUSER.btn.length <= 4) {
        return true
      } else {
        return false
      }
    },

    showInputOnly () {
      if (this.DATAUSER.input === undefined) {
        return false
      } else {
        return true
      }
    },

    showSelectOnly () {
      if (this.DATAUSER.btn === undefined) {
        return false
      }

      if (this.DATAUSER.btn.length > 4) {
        return true
      } else {
        return false
      }
    },

    customType () {
      if (this.DATAUSER.input.val === 'email') {
        return 'email'
      } else if (this.DATAUSER.input.val === 'phone') {
        return 'tel'
      }
      return 'text'
    },

    showFooter () {
      if (!this.DATAUSER.input) {
        if (!this.DATAUSER.btn) {
          return false
        }
      }

      return true
    }
  },

  methods: {
    getQst (event) {
      let inputValue = event.target.value // "Quel CMS ..."
      EventBus.$emit('getQst', inputValue)

      if (UIkit.dropdown(`#${this.uniqueId}`)) {
        UIkit.dropdown(`#${this.uniqueId}`).show()
      }
    },

    goBack () {
      this.disabled = true
      EventBus.$emit('goBack', this.currentId)
    },

    emitNext (event) {
      this.disabled = true

      let userText = event.target.innerText // "ALLONS-Y!"
      let goToID = event.target.value // "id102"

      if (UIkit.dropdown(`#${this.uniqueId}`)) {
        UIkit.dropdown(`#${this.uniqueId}`).$destroy(true)
      }

      EventBus.$emit('userFeedback', userText)

      setTimeout(() => {
        EventBus.$emit('goTo', goToID)
        // this.$destroy()
      }, 800)
    },

    emitValue (event) {
      let userText = this.inputValue.split('#')[0] // Pierre
      let newVal = {} // {}
      let goToID

      if (this.inputValue === '') {
        return
      }

      if (this.DATAUSER.input !== undefined) {
        if (this.DATAUSER.input.val === 'email') {
          const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          let testMe = regex.test(String(this.inputValue).toLowerCase())
          if (testMe === false) {
            return
          } else {
            this.disabled = true
          }
        } else if (this.DATAUSER.input.val === 'phone') {
          const regex = /^(?=.*[0-9])[- +()0-9]+$/
          let testMe = regex.test(String(this.inputValue).toLowerCase())
          if (testMe === false) {
            return
          } else {
            this.disabled = true
          }
        } else if (this.DATAUSER.input.val === 'name') {
          this.disabled = true
        }

        let ino = this.DATAUSER.input.val // name
        newVal[ino] = userText // {name: "Pierre"}
        goToID = this.DATAUSER.input.go // "id102"
      } else {
        goToID = this.inputValue.split('#')[1] // "id102"
      }

      EventBus.$emit('userFeedback', userText)
      EventBus.$emit('inputEvent', newVal)

      setTimeout(() => {
        EventBus.$emit('goTo', goToID)
        // this.$destroy()
      }, 800)
    }
  },

  created () {
    if (this.type === 'me') {
      this.injectedClass = `uk-animation-slide-left-small chat-${this.type}`
    } else {
      this.injectedClass = `uk-animation-slide-right-small chat-${this.type}`
    }

    if (this.DATAUSER.go !== undefined) {
      setTimeout(() => {
        EventBus.$emit('goTo', this.DATAUSER.go)
      }, 800)
    }

    setTimeout(() => {
      this.showTxt = true
      this.animTxt = 'uk-animation-slide-bottom-small'
    }, 800)
  },

  mounted () {
    UIkit.dropdown(`#${this.uniqueId}`, {
      mode: 'click',
      pos: 'top-justify',
      animation: 'uk-animation-slide-top-small',
      duration: 400
    })

    let chat = document.getElementById(`chat${this.uniqueId}`)
    chat.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    })

    if (this.lastId === 'id17a') {
      EventBus.$emit('success', '(soit 0.06666666∞)')
    } else if (this.lastId === 'id17b') {
      EventBus.$emit('success', '#Front-end Web Boulanger')
    } else if (this.lastId === 'id17c') {
      EventBus.$emit('success', 'Trop Terre à terre 🏡')
    } else if (this.lastId === 'id14e') {
      EventBus.$emit('success', 'La politesse ne coûte rien et achète tout.')
    }
  },

  updated () {
    if (this.currentId !== this.lastId) {
      this.disabled = true
    }
  }
}
</script>

<style lang="css">
.chat {
    opacity: 0
}

.chat-me + .chat-me .uk-card-header {
  display: none
}

.this-is-user .uk-card-header {
    background-color: rgb(240, 80, 110)
}

.wave-dot {
  position:relative;
}

.wave-dot .dot {
  display:inline-block;
  width:6px;
  height:6px;
  border-radius:6px;
  margin-right:3px;
  background:#303131;
  animation: wave 0.65s linear infinite;
}

.wave-dot .dot:nth-child(2) {
  animation-delay: -0.55s;
}

.wave-dot .dot:nth-child(3) {
  animation-delay: -0.45s;
}

.uk-notification-message {
  background-color: #303131;
  font-size: 0.75rem;
  color: #fff;
}

.uk-notification-close {
  width:10px;
  height:10px;
}

@keyframes wave {
  0%, 60%, 100% {
    transform: initial;
  }

30% {
    transform: translateY(-5px);
  }
}
</style>
