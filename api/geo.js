import micro from "micro-cors"
import geolite2 from "geolite2"
import maxmind from "maxmind"

function simplify(lookup) {
  const {
    city,
    continent,
    country,
    location,
    postal,
    registered_country,
    subdivisions,
  } = lookup
  return {
    city: city ? city.names.en : "",
    contintent: continent
      ? {
          code: continent.code || "",
          name: continent.names.en || "",
        }
      : {},
    country: country
      ? {
          iso_code: country.iso_code,
          name: country.names.en,
        }
      : {},
    location: location || {},
    postal: postal || {},
    registered_country: registered_country
      ? {
          iso_code: registered_country.iso_code,
          name: registered_country.names.en,
        }
      : {},
    subdivisions: subdivisions
      ? {
          iso_code: subdivisions.iso_code,
          name: subdivisions.names.en,
        }
      : {},
  }
}

function geo(req, res) {
  const ip = req.headers["x-forwarded-for"]

  maxmind.open(geolite2.paths.city).then((lookup) => {
    if (req.query.ip) {
      res.json(simplify(lookup.get(req.query.ip)))
    } else {
      res.json(lookup.get(ip))
    }
  })
}

const cors = micro()
export default cors(geo)
