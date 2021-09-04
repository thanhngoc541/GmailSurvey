//prod.js - production keys here
module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: process.env.MONGO_URI,
    cookieKey: process.env.COOKIE_KEY,
    stripePubKey:process.env.STRIPE_PUBLIC_KEY,
    stripeSecKey:process.env.STRIPE_SECRET_KEY
}
//