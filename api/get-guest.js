const axios = require('axios')

export default function handler(request, response) {
  axios(process.env.APPS_SCRIPT_URL, {
    params: {
      action: 'getGuest',
      name: request.query.name
    }
  }).then((res) => {
    response.status(200).json(res.data)
  })
}
