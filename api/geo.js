import geolite2 from "geolite2"
import maxmind from "maxmind"
import dns from "dns"

export default async (req, res) => {

  let ip
  if (req.query.host) {
    dns.lookup(req.query.host, (_, address) => {
      ip = address
    })
  } else {
    ip = req.headers["x-forwarded-for"]
  }

  const lookupCity = await maxmind.open(geolite2.paths.city)
  const lookupAsn = await maxmind.open(geolite2.paths.asn)

  const city = lookupCity.get(ip)
  const asn = lookupAsn.get(ip)

  res.json({ ...city, asn })
}
