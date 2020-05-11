import micro from "micro-cors"
import geolite2 from "geolite2"
import maxmind from "maxmind"
import dns from "dns"

function geo(req, res) {
  const ip = req.headers["x-forwarded-for"]

  maxmind.open(geolite2.paths.city).then((lookup) => {
    if (req.query.host) {
      dns.lookup(req.query.host, (_, address) => {
        res.json(lookup.get(address))
      })
    } else {
      res.json(lookup.get(ip))
    }
  })
}

const cors = micro()
export default cors(geo)
