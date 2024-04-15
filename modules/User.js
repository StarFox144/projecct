// modules/User.js

class UserService {
    constructor() {
        console.log("UserService created");
        this.shownTours = new Set(); // Множина для збереження вже відображених турів
    }

    addUsers(users) {
        for (const user of users) {
            console.log(`User added: id${JSON.stringify(user)}`);
            // Додаємо id туру до множини вже відображених турів
            this.shownTours.add(user.idTour);
        }
        // Виводимо інформацію про тури, які ще не відображалися

    }

}

module.exports = UserService;
