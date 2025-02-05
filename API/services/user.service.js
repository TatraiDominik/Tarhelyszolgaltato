const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

exports.registerUser = async (name, email, password) => {
    // Extract email prefix (before the '@')
    const emailPrefix = email.split('@')[0];
    
    // Create domain from email prefix
    const domain = `www.${emailPrefix}.com`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with the extracted domain
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        domain
    });

    return user;
};


exports.loginUser = async (email, password) => {
    const user = await User.findOne({where: { email }});
    if (!user) throw new Error('Nem regisztrált felhasználó!');
    if (! await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');

    const token = generateToken({ id: user.id, name: user.name, email: user.email});

    return { token,
        user:{
            name:user.name,
            domain:user.domain
        } }; 
}

exports.getAllUsers = async () => {
    return await User.findAll({
        attributes: {exclude: ['password']}
    });
}


exports.deleteUser = async (userId) => {
    
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error('Felhasználó nem található!');
    
    // Destroy the user record
    await User.destroy({ where: { id: userId } });

    return { message: 'Felhasználó törölve.' };
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
                email: updatedUser.email,
                domain: updatedUser.domain
            }
        });
    } catch (error) {
        next(error);
    }
};