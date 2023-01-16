const express = require("express");
var app = express();
var server = http.createServer(app);

server.listen(3000);
console.log(
  "Listening on port %d in %s mode",
  server.address().port,
  app.settings.env
);
const Twitter = require("twitter");
require("dotenv").config();
const router = express.Router();

const twitterClient = new Twitter({
  bearer_token: process.env.BEARER_TOKEN,
});

const searchTweet = async () => {
  const options = {
    result_type: "recent",
    // geocode,
  };
  const result = await twitterClient.get("search/tweets", options);
  return result;
};
/* GET home page. */
router.get("/search", async (res) => {
  // const { geocode } = req.query;
  res.json(await searchTweet());
});

module.exports = router;

// const bodyParser = require("body-parser");
// const fetch = import("node-fetch");

// const OAuth = require("oauth-1.0a");
// const qs = require("qs");
// const HmacSHA1 = require("crypto-js/hmac-sha1");
// const Base64 = require("crypto-js/enc-base64");

// const port = process.env.PORT || 3000;

// const config = {
//   TWITTER: {
//     CLIENT_ID: "aWNG9Ngbw4S2qw1iM9VTvhNZr",
//     CLIENT_SECRET: "qfc5HA2bufW8aEu1QWProBKOJ2KseTcYFkprBUDq0AjEEfeef1",
//   },
// };

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.post("/auth/twitter/request_token", async (req, res) => {
//   const { redirect_uri } = req.body;

//   const oauth = OAuth({
//     consumer: {
//       key: config.TWITTER.CLIENT_ID,
//       secret: config.TWITTER.CLIENT_SECRET,
//     },
//     signature_method: "HMAC-SHA1",
//     hash_function: (baseString, key) =>
//       Base64.stringify(HmacSHA1(baseString, key)),
//   });

//   const request_data = {
//     url: "https://api.twitter.com/oauth/request_token",
//     method: "POST",
//     data: {
//       oauth_callback: redirect_uri,
//     },
//   };

//   const response = await fetch(request_data.url, {
//     method: request_data.method,
//     headers: oauth.toHeader(oauth.authorize(request_data)),
//   });

//   const text = await response.text();
//   return res.json(qs.parse(text));
// });

// app.post("/auth/twitter/access_token", async (req, res) => {
//   const { oauth_token, oauth_token_secret, oauth_verifier } = req.body;

//   const oauth = OAuth({
//     consumer: {
//       key: config.TWITTER.CLIENT_ID,
//       secret: config.TWITTER.CLIENT_SECRET,
//     },
//     signature_method: "HMAC-SHA1",
//     hash_function: (baseString, key) =>
//       Base64.stringify(HmacSHA1(baseString, key)),
//   });

//   const request_data = {
//     url: "https://api.twitter.com/oauth/access_token",
//     method: "POST",
//     data: {
//       oauth_verifier,
//     },
//   };

//   const headers = oauth.toHeader(
//     oauth.authorize(request_data, {
//       key: oauth_token,
//       secret: oauth_token_secret,
//     })
//   );

//   const response = await fetch(request_data.url, {
//     method: request_data.method,
//     data: request_data.data,
//     headers,
//   });

//   if (response.status !== 200) {
//     res.status = response.status;
//     return res.json({ message: "something wrong" });
//   }
//   const text = await response.text();
//   return res.json(qs.parse(text));
// });

// if (!module.parent) {
//   app.listen(3000, () => {
//     console.log("Example app listening on port 3000!");
//   });
// }

// module.exports = app;
