const amqp = require('amqplib');

async function consumeMessages() {
    try {
        const conn = await amqp.connect('amqp://user:password@localhost'); // Замініть 'username' та 'password' на ваші дані
        const ch = await conn.createChannel();
        
        await ch.assertQueue('results_queue', { durable: true });

        console.log('Consumer connected to RabbitMQ and waiting for messages...');

        ch.consume('results_queue', (msg) => {
            if (msg !== null) {
                console.log('Received message from RabbitMQ:', msg.content.toString());
                // Тут ви можете обробити отримане повідомлення, викликавши відповідні функції або методи
                // Наприклад, ви можете передати це повідомлення вашому додатку для подальшої обробки
                // Після обробки повідомлення ви також можете підтвердити його отримання
                ch.ack(msg); // Підтвердження успішного отримання повідомлення
            }
        });
    } catch (error) {
        console.error('Error consuming messages:', error);
    }
}

consumeMessages();