var amqp = require('amqplib/callback_api');
require('dotenv').config();

const AMQPURL = process.env.RABBITMQ_AMQP_URL;
const queue = process.env.RABBITMQ_QUEUE;

const people = [
    'Beatriz',
    'Daniel',
    'Eudmar',
    'Gustavo',
    'Marcio',
    'Matheus',
    'Mônica',
    'Natalia',
    'Nicole',
    'Victor'
];

amqp.connect(AMQPURL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        for(let person of people) {
            ch.assertQueue(queue, { durable: false });     
            ch.sendToQueue(queue, new Buffer(person));
            console.log(" [x] Sent %s", person);
        }
    });
    setTimeout(function () { conn.close(); process.exit(0) }, 500);
});