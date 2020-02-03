const express = require('express')
bodyParser = require('body-parser')
cors = require('cors')
apiProductRoutes = require('./api/routes/products')
apiCategoryRoutes = require('./api/routes/categories')
apiUserRoutes     = require('./api/routes/users')
apiCartRoutes     = require('./api/routes/carts')
apiOrderRoutes    =  require('./api/routes/orders')
apiNewsRoutes     = require('./api/routes/news')
indexRoutes     = require('./web/routes/index')
// productRoutes   = require('./web/routes/products')
morgan = require('morgan')
// MongoClient = require('mongodb').MongoClient
mongoose    = require('mongoose')
url = 'mongodb://localhost:27017/priceapp'
dbKey = require('./config/keys').mongoURI
path = require('path')
app = express()
db = require('./db')


db.connect(dbKey)
mongoose.set('useCreateIndex', true);
mongoose.set('findOneAndUpdate', true)
mongoose.set('findOneAndDelete', true)
mongoose.set('usefindOneAndModify', true)
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.set('views', path.join(__dirname + '/web/views'));
app.set('view engine', 'ejs');
app.use('/static', express.static('public'))
app.use(indexRoutes);
// app.use('products/', productRoutes)
app.use('/api/products', apiProductRoutes);
app.use('/api/categories', apiCategoryRoutes);
app.use('/api/users', apiUserRoutes)
app.use('/api/carts', apiCartRoutes)
app.use('/api/orders', apiOrderRoutes)
app.use('/api/news', apiNewsRoutes)

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app