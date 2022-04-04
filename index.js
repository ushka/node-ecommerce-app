const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session')
const usersRepo = require('./repositories/users');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  keys: ['eqkl12lkjqwelkj2123jklj23']
}));

app.get('/signup', (req, res) => {
  res.send(`
    <div>
      Your id is: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordconfirmation" placeholder="password confirmation" />
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post('/signup', async (req, res) => {
  const { email, password, passwordconfirmation } = req.body;
  
  const existingUser = await usersRepo.getOneBy({ email });
  if(existingUser) {
    return res.send('Email already registered.')
  }

  if(password !== passwordconfirmation) {
    return res.send('Passwords do not match.') 
  }

  const user = await usersRepo.create({ email, password });
  req.session.userId = user.id;

  res.send('Account created');
});

app.get('/signout', (req, res) => {
  req.session = null;
  res.send('You are logged out');
});

app.get('/signin', (req, res) => {  
  res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>
  `);
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepo.getOneBy({ email });

  if(!user) {
    return res.send('Email not found.')
  }

  if(user.password !== password) {
    return res.send('Invalid password.') 
  }

  req.session.userId = user.id;

  res.send('You are signed in.');
});

app.listen(3000, () => {
  console.log('Listening')
});