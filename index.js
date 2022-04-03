const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordconfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
  console.log(req.body);
  res.send('Account created');
});

app.listen(3000, () => {
  console.log('Listening')
});