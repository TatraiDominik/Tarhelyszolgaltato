const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

exports.registerUser = async (name, email, password, domain) => {
    const hashedPassword = await bcrypt.hash(password, 10);

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

    return { token }; 
}

exports.getAllUsers = async () => {
    return await User.findAll({
        attributes: {exclude: ['password']}
    });
}