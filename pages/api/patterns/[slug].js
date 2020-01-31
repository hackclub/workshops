const GeoPattern = require('geopattern')

const pattern = (text = 'Hack Club') =>
  GeoPattern.generate(text, { baseColor: '#ec3750' })

export default (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'image/svg+xml')
  return res.end(pattern(req.query.slug).toString())
}
