const axios = require('axios')

export default function handler(request, response) {
  axios(process.env.APPS_SCRIPT_URL, {
    params: {
      action: 'doRsvp',
      name: request.query.name,
      attending: request.query.attending
    }
  }).then((res) => {
    response.status(200).json(res.data)
  })
}
