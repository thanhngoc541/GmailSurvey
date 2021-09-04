const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./model/User')
require('./services/passport');
const path = require('path');
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();

app.use(express.json())
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}))

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {


    app.use(express.static(path.join(__dirname, 'client', 'build')));

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);