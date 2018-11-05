<template>
  <div class="">
    <!-- render blog posts -->
    <ul>
      <li v-for="post in posts">
        {{ post }}
      </li>
    </ul>
  </div>
</template>

<script>
  import {createClient} from '../plugins/contentful.js'

  const client = createClient()

  export default {
    data: function () {
      return {
        posts: 'lorem'
      }
    },
    asyncData () {
      return Promise.all([
        client.getEntries({
          'content_type': 'blogPost',
          order: '-sys.createdAt'
        })
      ]).then((posts) => {
        return {
          posts: "tata"
        }
      }).catch(console.error)
    }
  }
</script>
