const auth = require('../../../auth')

const checkAuth = (action) => {
  function middleware (req, res, next) {
    const owner = req.body.id
    switch (action) {
      case 'create':
        auth.check.logged(req, owner)
        next()
        break
      case 'update':
        req.body.user = auth.check.getId(req)
        next()
        break
      case 'logged':
        req.body.user = auth.check.getId(req)
        next()
        break
      case 'add':
        req.body.user = auth.check.getId(req)
        next()
        break
      default:
        next()
    }
  }

  return middleware
}
module.exports = checkAuth