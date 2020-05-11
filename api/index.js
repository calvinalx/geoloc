import micro from "micro-cors"
import dns from "dns"

function ip(req, res) {
  if (req.query.host) {
    dns.lookup(req.query.host, (_, address) => {
      res.json({ ip: address })
    })
  } else {
    const ip = req.headers["x-forwarded-for"]
    res.json({ ip })
  }
}

const cors = micro()
export default cors(ip)
