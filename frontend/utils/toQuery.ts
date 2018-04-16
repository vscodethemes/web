export default (params: any): any => {
  const query: any = {}
  Object.keys(params).forEach(key => {
    if (params[key]) {
      query[key] = params[key]
    }
  })
  return query
}
