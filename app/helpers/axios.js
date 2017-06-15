const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true
axios.defaults.responseType = 'json'

module.exports = axios
