import express from 'express';
import morgan from 'morgan';
import path from 'path';
import "@babel/polyfill";
let crypto;
try {
    crypto = require('crypto');
} catch (err) {
    //   console.log('crypto support is disabled!');
}

//Importing Routes
import ProductRoutes from './routes/product';

const app = express();

//middlewares
app.all('*', function(req, res, next) {
    req.headers['if-none-match'] = 'no-match-for-this';
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token");
    next();
});

app.use('/', express.static(path.join(__dirname, '../app')));
app.use(morgan('dev'));
app.use(express.json({
    limit: '100mb'
}));
app.use(express.urlencoded({
    limit: '50mb',
    'extended': 'true'
}));
app.use(express.json({
    type: 'application/vnd.api+json'
}));

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../app', 'index.html'));
})

//routes
app.use('/api/product', ProductRoutes)

export default app;