const express = require("express")
const fs = require("fs")

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const app = express();

app.use(express.json());

app.get('/*', function (req, res) {
  const path = req.url
  const file = fs.readFileSync(`./public${path}`)
  const baseResponse = new Buffer.from(file)
  const encodedResponse = baseResponse.toString('base64')
  res.send({
    content: encodedResponse
  })
});


app.listen(3000)

