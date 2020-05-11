import micro from "micro-cors"
import geolite2 from "geolite2"
import maxmind from "maxmind"

function geo(req, res) {
  const ip = req.headers["x-forwarded-for"]

  maxmind.open(geolite2.paths.city).then((lookup) => {
    if (req.query.ip) {
      res.json(lookup.get(req.query.ip))
    } else {
      res.json(lookup.get(ip))
    }
  })
}

const cors = micro()
export default cors(geo)
