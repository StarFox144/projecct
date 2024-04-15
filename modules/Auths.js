// modules/AuthS.js

class AuthService {
    constructor() {
        console.log("AuthService created");
    }

    registerUser(user) {
        console.log("User registered:", user.id);
        // Код для реєстрації користувача
    }

    signInUser(username, password) {
        console.log("User signed in");
        // Код для входу користувача
    }
}

module.exports = AuthService;
