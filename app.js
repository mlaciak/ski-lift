const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./nodemon');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profiles');
const usersRoutes = require('./routes/users');
const productsRoutes = require('./routes/products');
const ordersRoutes = require('./routes/orders');

mongoose.connect('mongodb://node-shop:' + process.env.MONGO_ATLAS_PW +'@node-rest-shop-shard-00-00-e96ub.mongodb.net:27017,node-rest-shop-shard-00-01-e96ub.mongodb.net:27017,node-rest-shop-shard-00-02-e96ub.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-shop-shard-0&authSource=admin&retryWrites=true',{
    // useMongoClient: true
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});

//set up view engine
app.set('view engine','ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.env.COOKIE_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//setup routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);
app.use('/users',usersRoutes);
app.use('/products',productsRoutes);
app.use('/orders',ordersRoutes);

//create home route
app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
});


//handling errors
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next)=>{
    // res.status(error.status || 500);
    res.render('404',{user:req.user});
    // res.json({
    //     error:{
    //         message: error.message
    //     }
    // });
});

module.exports = app;