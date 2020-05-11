import dns from "dns"

export default (req, res) => {
  if (req.query.host) {
    dns.lookup(req.query.host, (_, address) => {
      res.json({ ip: address })
    })
  } else {
    const ip = req.headers["x-forwarded-for"]
    res.json({ ip })
  }
}
