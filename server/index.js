const express = require("express");
const app = express();

app.use('/', express.static(__dirname));

app.get('/', (req, res) => {
  res.send("Welcome! Peopletalk mobile dev server");
});

app.listen(3030, console.log.bind(console, "Peopletalk dev server listening on port 3030"));
