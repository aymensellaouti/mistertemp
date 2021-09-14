export default () => ({
  port: +process.env.APP_PORT || 3001,
  mail: {},
  db: {
    host: 'localhost'
  }
})
