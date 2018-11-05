const contentful = require('contentful')
// use default environment config for convenience
const config = {
  space: 'w5s3ac9iqvx2',
  accessToken: '5a819d7a09aff26641f212718f2f7687cf71806be2d88dabc0f0b3e229926552'
}

// export `createClient` to use it in page components
module.exports = {
  createClient () {
    return contentful.createClient(config)
  }
}