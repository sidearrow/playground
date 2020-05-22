import bodyParser from 'body-parser';
import express, { urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

const LOGIN_FORM_HTML = `
<form method="post" action="/login">
  <input type="text" name="username" placeholder="USER NAME" />
  <input type="password" name="password" placeholder="PASSWORD" />
  <input type="submit" value="送信" />
</form>
`;


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}));

passport.use(new LocalStrategy((username, password, done) => {
  if (username === 'username' && password === 'password') {
    return done(null, {});
  }
  return done(null, false);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('LOGINED');
});

app.get('/login', (req, res) => {
  res.send(LOGIN_FORM_HTML);
});

app.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => { res.redirect('/') }
);

app.listen(3000);
