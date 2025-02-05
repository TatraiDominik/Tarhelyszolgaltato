const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

// Regisztráció
exports.registerUser = async (name, email, password) => {
    const emailPrefix = email.split('@')[0];
    const domain = `www.${emailPrefix}.com`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        domain
    });

    return user;
};

// Belépés
exports.loginUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Nem regisztrált felhasználó!');
    if (!await bcrypt.compare(password, user.password)) throw new Error('Hibás jelszó!');

    const token = generateToken({ id: user.id, name: user.name, email: user.email });
    return { token, user: { name: user.name, domain: user.domain } };
};

// Felhasználó adatok lekérése (profil)
exports.getUser = async (userId) => {
    const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] }  // Jelszót nem küldünk vissza
    });
    if (!user) throw new Error('Felhasználó nem található!');
    return user;
};

// Felhasználók listája (admin)
exports.getAllUsers = async () => {
    return await User.findAll({ attributes: { exclude: ['password'] } });
};

// Felhasználó törlés
exports.deleteUser = async (userId) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error('Felhasználó nem található!');
    await User.destroy({ where: { id: userId } });
    return { message: 'Felhasználó törölve.' };
};

// Felhasználó frissítése
exports.updateUser = async (userId, { name, email, password }) => {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new Error('Felhasználó nem található!');

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
    }

    const updatedUser = await user.update({
        name: name || user.name,
        email: email || user.email,
        password: password || user.password
    });

    return updatedUser;
};
