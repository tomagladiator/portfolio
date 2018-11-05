<template>
  <div class="contact">
    <div class="uk-container">
      <div class="uk-card uk-card-body">
          <h1>Un mot doux ?</h1>

          <p>
            Une opportunité d'emploi? Passez par <a href="/chatbot">mon chatBot</a> en premier pour vérifier que mon profil correspond bien à votre poste.
          </p>

          <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" action="thanks" class="uk-grid-small" uk-grid>
            <div class="uk-width-1-2@s">
              <input type="hidden" name="form-name" value="contact" />

              <label for="name" class="uk-form-label">Votre nom
                <input required type="text" name="name" id="name" class="uk-input" />
              </label>
            </div>

            <div class="uk-width-1-2@s">
              <label for="email" class="uk-form-label">Votre courriel
                <input required type="email" name="email" id="email" class="uk-input" />
              </label>
            </div>

            <div class="uk-width-1-1">
              <label for="message" class="uk-form-label uk-margin-bottom">Message
                <textarea required name="message" id="message" class="uk-textarea" />
              </label>
            </div>

            <div class="uk-width-1-1">
              <button type="submit" class="uk-button uk-button-primary">
                <span class="uk-icon uk-margin-small-right" uk-icon="icon: bolt"> Pfiuuuuu</span>
              </button>
            </div>
          </form>
      </div>
    </div>
  </div>
</template>
