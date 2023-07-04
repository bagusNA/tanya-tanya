export default eventHandler((event) => {
  return {
    data: getQuery(event)
  }
})
