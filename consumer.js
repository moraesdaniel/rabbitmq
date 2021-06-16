require('dotenv').config();
var amqp = require('amqplib/callback_api');

const AMQPURL = process.env.RABBITMQ_AMQP_URL;
const queue = process.env.RABBITMQ_QUEUE;

amqp.connect(AMQPURL, function (err, conn) {
    conn.createChannel(function (err, ch) {
        ch.assertQueue(queue, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        ch.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, { noAck: true });
    });
});