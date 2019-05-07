<template>
  <div class="page-contact">
    <div class="uk-container">
      <div class="uk-card uk-card-body">
          <h1>Un mot doux ?</h1>

          <p>
            Une opportunité d'emploi? Passez tout d'abord par <router-link to="/chatbot">mon chatBot</router-link> en premier pour vérifier que mon profil correspond bien à votre poste.
          </p>

          <p>
            Par la suite:
          </p>

          <form method="POST" action="https://formspree.io/constraintsolver@gmail.com">
            <fieldset class="uk-fieldset">
              <div class="uk-margin">
                <input
                  type        ="email"
                  name        ="email"
                  placeholder ="L'email"
                  class       ="uk-input"
                  required
                >
              </div>

              <div class="uk-margin">
                <textarea
                  name        ="message"
                  placeholder ="Le Message"
                  class       ="uk-textarea"
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
  }
}
</script>

<style lang="scss">
.page-contact {
  min-height: calc(100vh - 134px);
}
</style>
