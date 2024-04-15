
async function main() {
    const ch = await createChannel(conn);

    // Додавання користувачів та оплачених турів
    const users = [1, 2, 3];
    const tours = [1, 2];

    for (const user of users) {
        ch.sendToQueue('user_queue', Buffer.from(user.toString()));
    }

    for (const tour of tours) {
        ch.sendToQueue('tour_queue', Buffer.from(tour.toString()));
    }
}

main();

const AuthService = require('./modules/Auths');
const UserService = require('./modules/User');
const PaymentController = require('./modules/payment/payControll');

// Створення екземплярів сервісів
const authService = new AuthService();
const userService = new UserService();
const paymentController = new PaymentController();

// Додавання користувачів
const users = [
    { id: '14', name: 'Янош', idTour: '88' },
    { id: '52', name: 'Рома', idTour: '52'},
    { id: '22', name: 'Илья', idTour: '68'}
];
userService.addUsers(users);

// Додавання оплачених турів
const paidTours = [
    { id: '52', name: 'Netherland', value: 500 },
    { id: '68', name: 'France', value: 500 },
    { id: '88', name: 'Austria', value: 500}

];
paymentController.addPaidTours(paidTours);
