const express = require('express')
const app = express()
require('dotenv').config()

const webRoutes = require('./routes/web')
const configViewEngine = require('./config/viewEngine')
const port = process.env.PORT || 8081



// engine 
configViewEngine(app)
// route 
//tất cả routes đứng sau / 
app.use('/', webRoutes)



// lắng nghe thành công -> in ra console 
// localhost - 127.0.0.1 
app.listen(port, () => console.log('Example app listening at http://localhost:${port}'))
// ctrl c -> disconnect server