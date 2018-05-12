import * as qs from 'querystring'

export default (query: any, headers: any = {}) => ({
  Records: [
    {
      cf: {
        request: { querystring: qs.stringify(query) },
        response: { headers },
      },
    },
  ],
})
