const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'word',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res, next) => {
    console.log(req.flash());
    res.render('index');
});

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new LocalStrategy({
    usernameField: 'user_name',
    passwordField: 'pass_word'
}, (name, pass, done) => {
    if(name === 'admin'){     //username is admin
        if(pass === '1234'){  //password is 1234
            return done(null, name);
        }
        return done(null, false, { message: 'Wrong password' });
    }
    return done(null, false, { message: 'Wrong username'});
}));

app.post('/login', passport.authenticate('local',  {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
    successFlash: "Welcome" //in terminal
}));

app.listen(3000, () => {
    console.log('Server Running on port 3000...');
})
