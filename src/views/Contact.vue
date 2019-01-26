<template>
  <div class="contact">
    <div class="uk-container">
      <div class="uk-card uk-card-body">
          <h1>Un mot doux ?</h1>

          <p>
            Une opportunité d'emploi? Passez tout d'abord par <router-link to="/chatbot">mon chatBot</router-link> en premier pour vérifier que mon profil correspond bien à votre poste.
          </p>

          <p>
            Pour tout autre demande, ou pour m'envoyer vos photos de vacances, voici mon courriel : <a href="mailto:constraintsolver@gmail.com">constraintsolver@gmail.com</a>
          </p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatbot',
  metaInfo: {
    title: 'Me joindre'
  }
}
</script>
