require('dotenv')
  .config({ path: './.env.default' })

process.env.API_LOG_LEVEL = 'silent';