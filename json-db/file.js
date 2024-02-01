module.exports = (req, res, next) => {
  res.header('Access-Control-Expose-Headers', 'Content-Range')
  res.header('Content-Range', 'clients 0-24/2')
  next()
}