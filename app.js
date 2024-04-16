
const { connectToRabbitMQ, createChannel } = require('./lib/rmq');

// Ваш код для створення та роботи з сервісами (AuthService, UserService, PaymentService)

async function main() {
    try {
        // Ваш код для створення та роботи з сервісами

        // Підключення до RabbitMQ
        const conn = await connectToRabbitMQ();
        const ch = await createChannel(conn);

        // Отримання результатів вашого додатку
        const result = 'AuthService created\nUserService created\nPaymentService created\nUser added: id{"id":"25","name":"Янош","idTour":"49"}\nUser added: id{"id":"4","name":"Рома","idTour":"200"}\nUser added: id{"id":"0","name":"Agent","idTour":"34"}\nTour ready: 34\nTour ready: 49\nTour ready: 200\n';

        // Надсилання результату до RabbitMQ
        await ch.assertQueue('results_queue', { durable: true });
        await ch.sendToQueue('results_queue', Buffer.from(result));

        console.log('Result sent to RabbitMQ');

        // Створення споживача для отримання повідомлень з RabbitMQ
        await ch.assertQueue('results_queue', { durable: true });
        ch.consume('results_queue', (msg) => {
            const message = msg.content.toString();
            console.log('Message received from RabbitMQ:', message);
            // Тут ви можете обробити отримане повідомлення з RabbitMQ
        }, { noAck: true });

        // Закриваємо з'єднання
        // await ch.close();
        // await conn.close();
    } catch (error) {
        console.error('Error in main:', error);
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
