<template>
  <div class="page-contact">
    <div class="uk-container">
      <div class="uk-card uk-card-body">
          <h1>{{ t('Un mot doux ?') }}</h1>

          <p>
            {{ t('opportunity') }} <router-link to="/chatbot">{{ t('mon chatBot') }}</router-link> {{ t('to check if my profile matches your position.') }}
          </p>

          <p>
            {{ t('Par la suite:') }}
          </p>

          <form method="POST" action="https://formspree.io/constraintsolver@gmail.com">
            <fieldset class="uk-fieldset">
              <div class="uk-margin">
                <input
                  type         ="email"
                  name         ="email"
                  :placeholder ="t('email')"
                  class        ="uk-input"
                  required
                >
              </div>

              <div class="uk-margin">
                <textarea
                  name         ="message"
                  :placeholder ="t('Le Message')"
                  class        ="uk-textarea"
                  required
                >
                </textarea>
              </div>

              <button
                type="submit"
                class ="uk-button uk-button-primary">
                Pfiuuu
              </button>
            </fieldset>
          </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatbot',

  metaInfo: {
    title: 'Me joindre'
  },

  locales: {
    en: {
      'Un mot doux ?': 'Sweet word?',
      'opportunity': 'A job opportunity? First go through',
      'mon chatBot': 'my chatbot',
      'en premier pour vérifier que mon profil correspond bien à votre poste.': 'to check if my profile matches your position.',
      'Par la suite:': 'Afterwards:',
      'email': 'The email:',
      'Le Message': 'The Message'
    },

    fr: {
      'opportunity': `Une opportunité d'emploi? Passez tout d'abord par`,
      'email': `L'email:`
    }
  }
}
</script>

<style lang="scss">
.page-contact {
  min-height: calc(100vh - 134px);
}
</style>
