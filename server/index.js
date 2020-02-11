const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ChatKit = require("@pusher/chatkit-server");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const chatkit = new ChatKit.default({
  instanceLocator: "v1:us1:1e1206f2-e97d-4146-ba57-e8b4225caf97",
  key:
    "cd7c2855-0b48-48d7-a307-0e56e49e2291:TZoHP6cFAdRBNLWl/yxdWNHuRZu6jx0zLUWk4/WyXzc="
});

app.post("/authenticate", (req, res) => {
  const authData = chatkit.authenticate({
    userId: req.query.user_id
  });
console.log(authData)
  res.status(authData.status).send(authData.body);
});

app.post("/users", (req, res) => {
  const { userName } = req.body;
  // console.log(req)
  chatkit
    .createUser({
      name: userName,
      id: userName
    })
    .then(() => {
      console.log(`chatkit then`);
      res.sendStatus(201);
    })
    .catch(error => {
      if (error.error === "services/chatkit/user_already_exists") {
        console.log(`error: user already exist`);
        res.sendStatus(200);
      } else {
        console.log(error);
        res.status(error.status).json(error);
      }
    });
});

const PORT = 4000;
app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server running on port: ${PORT}`);
});
