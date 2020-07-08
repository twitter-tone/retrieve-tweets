'use strict';

require('dotenv').config();
const Twitter = require('twitter');
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'retrieve-tweets',
  brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS || 'localhost:9092']
});

const producer = kafka.producer();

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

const params = { follow: process.env.TWITTER_ID };

(async function () {
  await producer.connect();

  const stream = client.stream('statuses/filter', params);
  stream.on('data', async (event) => {
    if (event.user.id === Number(process.env.TWITTER_ID)) {
      await producer.send({
        topic: 'tweets',
        messages: [
          { value: event.text }
        ]
      });
    }
  });

  stream.on('error', function (error) {
    console.log(error);
  });

  await producer.disconnect();
})();
