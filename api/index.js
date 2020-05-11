import micro from "micro-cors"

function ip(req, res) {
  const ip = req.headers["x-forwarded-for"]
  res.json({ ip })
}

const cors = micro()
export default cors(ip)
