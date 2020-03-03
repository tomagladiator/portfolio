<template>
  <div class="thanks">
    <div class="uk-container">
      <div class="uk-card uk-card-body">
        <h1>
          {{ t('thanks') }}
        </h1>

        <p>
          {{ t('goback') }} <router-link to="/">{{ t('homepage') }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'thanks',

  metaInfo: {
    title: 'Merci!'
  },

  locales: {
    en: {
      'thanks': 'Thank you! The message was sent successfully',
      'goback': 'Back to',
      'homepage': 'home page'
    },

    fr: {
      'thanks': `Merci! Le message s'est bien envoyé`,
      'goback': 'Revenir sur la',
      'homepage': `page d'accueil`
    }
  }
}
</script>
