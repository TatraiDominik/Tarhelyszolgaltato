const userService = require('../services/user.service'); // A userService-t kell importálni
const { User } = require('../models/user.model');
const bcrypt = require('bcrypt'); // Jelszó hash-eléséhez

// Felhasználó regisztráció
exports.register = async (req, res, next) => {
    console.log('Request Body:', req.body);
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Hiányzó adatok!' });
        }

        const user = await userService.registerUser(name, email, password);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

// Felhasználó belépés
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Hiányzó adatok!' });
        }
        const user = await userService.loginUser(email, password);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Felhasználó profiljának lekérése (csak a bejelentkezett felhasználóra)
exports.getProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;  // A tokenből kiolvasott user ID
        const user = await userService.getUser(userId);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
};

// Felhasználó adatainak frissítése
exports.updateUser = async (req, res, next) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: 'Felhasználó nem található!' });
        }

        // Ha új jelszót adtak meg, akkor hash-eljük
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.body.password = hashedPassword;
        }

        // Felhasználó frissítése
        const updatedUser = await user.update({
            name: name || user.name,
            email: email || user.email,
            password: req.body.password || user.password  // Csak ha a jelszó változott
        });

        res.status(200).json({
            message: 'Felhasználó sikeresen frissítve!',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,  // Email, ha frissült
                domain: updatedUser.domain // Domain
            }
        });
    } catch (error) {
        next(error);
    }
};

// Felhasználó törlése
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

// Minden felhasználó lekérése
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Terv hozzáadása a felhasználóhoz
exports.addPlanToUser = async (req, res, next) => {
    try {
        const { userId, planId } = req.body;
        const message = await userService.addPlanToUser(userId, planId); 
        res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
};

// Felhasználó előfizetéseinek lekérése
exports.getUserPlans = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const plans = await userService.getUserPlans(userId); // Helyes változónév
        res.status(200).json(plans);
    } catch (error) {
        next(error);
    }
};
