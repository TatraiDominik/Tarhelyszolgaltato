const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token){
        return res.status(400).json({
            success: false,
            message: 'Hozzáférés megtagadva! Hiányzó token!'
        });
    }

    try{
        req.user = jwt.verify(token, config.jwtSecret);
        next();
    }catch(error){
        return res.status(400).json({
            success: false,
            message: 'Érvénytelen vagy lejárt token!'
        });
    }

}