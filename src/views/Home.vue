<template>
  <div>
    <div class="uk-section uk-preserve-color uk-section-primary">
      <div class="uk-container">
        <BusinessCard msg="Lead Front-End Senior - Freelance" />
      </div>
    </div>

    <div class="uk-section uk-preserve-color">
      <TechBaneer />
    </div>

    <RobotCta />

    <div class="uk-section uk-preserve-color" style="background:#f0506e">
      <div class="uk-container-large uk-container">
      <LinkedinTestimonial />
      </div>
    </div>
  </div>
</template>

<script>
import BusinessCard from '@/components/BusinessCard.vue'
import TechBaneer from '@/components/TechBaneer.vue'
import RobotCta from '@/components/RobotCta.vue'
import LinkedinTestimonial from '@/components/LinkedinTestimonial.vue'

export default {
  name: 'home',
  components: {
    BusinessCard,
    RobotCta,
    LinkedinTestimonial,
    TechBaneer
  }
}
</script>
