const express = require("express");
var app = express();

const Twitter = require("twitter");
require("dotenv").config();

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_SECRET,
  //   bearer_token: process.env.BEARER_TOKEN,
});
app.get("/", function (req, res, next) {
  res.send("server is up");
});
/* GET home page. */
app.get("/trends", function (req, res, next) {
  // ここでTwitterAPIを叩く
  twitterClient.get("trends/available", function (error, result, response) {
    if (error) {
      res.send(error);
    } else {
      res.send(result); // TwitterAPIの結果をそのまま返す
    }
  });
});
app.get("/search", (req, res) => {
  twitterClient.get(
    "search/tweets",
    { q: req.query.query, lang: "ja" },
    (error, tweets, response) => {
      if (error) {
        res.send(error);
      } else {
        res.send(tweets);
      }
    }
  );
  //   twitterClient.get(
  //     "search/tweets",
  //     { q: req.params, lang: "ja", local: "ja" },
  //     (error, result) => {
  //       if (error) {
  //         res.send(error);
  //       } else {
  //         res.send(result);
  //       }
  //     }
  //   );
});
app.listen(3001);

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
