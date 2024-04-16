// lib/rmq.js

const amqp = require('amqplib');

async function connectToRabbitMQ() {
    try {
        // Підключення до RabbitMQ з використанням готових облікових даних
        const conn = await amqp.connect('amqp://user:password@localhost'); // Замініть 'username' та 'password' на ваші дані
        return conn;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

async function createChannel(conn) {
    try {
        const ch = await conn.createChannel();
        return ch;
    } catch (error) {
        console.error('Error creating channel:', error);
    }
}

async function createExchangeAndQueues(ch) {
    try {
        // Створення обмінника
        await ch.assertExchange('SaintYan', 'direct', { durable: true });

        // Створення черг для користувачів і турів
        await ch.assertQueue('YansQueue', { durable: true });

        // Зв'язування черг з обмінником
        await ch.bindQueue('YansQueue', 'SaintYan', ''); // Вказуйте тут ім'я черги та обмінника, які ви використовуєте

        console.log('Exchange and queues created');
    } catch (error) {
        console.error('Error creating exchange and queues:', error);
    }
}

module.exports = { connectToRabbitMQ, createChannel, createExchangeAndQueues };
