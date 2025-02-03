const userService = require('../services/user.service');

exports.register = async (req, res, next) => {
    console.log('Request Body:', req.body);
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) { 
            return res.status(400).json({ message: 'Hiányzó adatok!' });
        }
        
        // Register the user without needing to pass the domain
        const user = await userService.registerUser(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if (!email || !password){
            return res.status(400).json({ message: 'Hiányzó adatok!'});
        }
        const user = await userService.loginUser(email, password);
        res.status(200).json(user);
    }catch(error){
        next(error);
    }
}

exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json({success:true, results: users});
    }catch(error){
        next(error);
    }
}