const paths = require('../paths.json')

const apiURL = paths.BACKEND_URL + 'api'

export const URLs = {
  user: {
    register: `${apiURL}/register`,
    login: `${apiURL}/login`,
    logout: `${apiURL}/logout`,
    getInitialInfo: `${apiURL}/get_initial_user_info`
  }
}