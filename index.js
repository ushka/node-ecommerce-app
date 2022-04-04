const express = require('express');
const bodyParser = require('body-parser');
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/', async (req, res) => {
  // console.log(req.body);
  const { email, password, passwordconfirmation } = req.body;
  
  const existingUser = await usersRepo.getOneBy({ email });
  if(existingUser) {
    return res.send('Email already registered.')
  }

  if(password !== passwordconfirmation) {
    return res.send('Passwords do not match.') 
  }

  res.send('Account created');
});

app.listen(3000, () => {
  console.log('Listening')
});