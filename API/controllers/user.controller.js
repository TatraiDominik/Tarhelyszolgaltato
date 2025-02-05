const userService = require('../services/user.service');
const { User } = require('../models/user.model'); 
const bcrypt = require('bcrypt');  // Add hozzá ezt a sort!

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

exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        
        if (!userId) {
            return res.status(400).json({ message: 'Hiányzó felhasználó ID!' });
        }

        const result = await userService.deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

exports.updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'Felhasználó nem található!' });
        }

        // Ellenőrizzük, ha új jelszót adtak meg, akkor hash-elni kell
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;  // Hash-elt jelszó
        }

        // Felhasználó frissítése
        const updatedUser = await user.update({
            name: name || user.name,
            email: email || user.email,
            password: req.body.password || user.password
        });

        res.status(200).json({
            message: 'Felhasználó sikeresen frissítve!',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,  // Ha az email is frissült, akkor ezt is hozzáadjuk
                domain: updatedUser.domain // Ha a domain is frissült, akkor ezt is hozzáadjuk
            }
        });
    } catch (error) {
        next(error);
    }
};