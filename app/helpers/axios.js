const axios = require('axios')

axios.defaults.baseURL = process.env.SITE_URL || 'http://localhost:3000'
axios.defaults.withCredentials = true
axios.defaults.responseType = 'json'

module.exports = axios
