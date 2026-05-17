const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  // Phusion Passenger (Plesk) support
  if (typeof PhusionPassenger !== "undefined") {
    server.listen("passenger");
  } else {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`> Ready on http://0.0.0.0:${port}`);
    });
  }
});
