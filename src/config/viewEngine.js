const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Định nghĩa hàm configViewEngine nhận đối số app
const configViewEngine = (app) => {
    // config view engine
    // ../ -> return previous directory 
    app.set('views', path.join(__dirname, '../views')); 
    app.set('view engine', 'ejs');

    // HTTP logger
    app.use(morgan('combined'));

    
    // Cấu hình file tĩnh
    app.use(express.static(path.join(__dirname, '../views'))); 
};

module.exports = configViewEngine;
