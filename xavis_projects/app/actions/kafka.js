// https://docs.confluent.io/kafka-clients/javascript/current/overview.html#javascript-client-promisified-api
import {Kafka} from '@confluentinc/kafka-javascript'

export async function producePing() {
    const producer = new Kafka().producer({
        'bootstrap.servers': '<fill>',
    });
    
    await producer.connect();
    
    const deliveryReports = await producer.send({
        topic: 'test-topic',
        messages: [
          { value: 'v1', key: 'x' },
        ]
    });
    
    console.log({deliveryReports});
    await producer.disconnect();
}

export async function consumePing() {
    const consumer = new Kafka().consumer({
        'bootstrap.servers': '<fill>',
        'group.id': 'test-group', // Mandatory property for a consumer - the consumer group id.
    });
    
    await consumer.connect();
    await consumer.subscribe({ topics: ["test-topic"] });
    
    consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          partition,
          headers: message.headers,
          offset: message.offset,
          key: message.key?.toString(),
          value: message.value.toString(),
        });
      }
    });
    
    // Whenever we're done consuming, maybe after user input or a signal:
    await consumer.disconnect();
}

const Kafka = require('@confluentinc/kafka-javascript');
require("dotenv").config();

function createProducer(config, onDeliveryReport) {
  const producer = new Kafka.Producer(config);

  return new Promise((resolve, reject) => {
    producer
      .on('ready', () => resolve(producer))
      .on('delivery-report', onDeliveryReport)
      .on('event.error', (err) => {
        console.warn('event.error', err);
        reject(err);
      });
    producer.connect();
  });
}

export async function produceExample() {
  const config = {
    // User-specific properties that you must set
    'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
    'sasl.username':     process.env.CLUSTER_API_KEY,
    'sasl.password':     process.env.CLUSTER_API_SECRET,
    // Fixed properties
    'security.protocol': 'SASL_SSL',
    'sasl.mechanisms':   'PLAIN',
    'acks':              'all',

    // Needed for delivery callback to be invoked
    'dr_msg_cb': true
  }

  let topic = "purchases";

  let users = [ "eabara", "jsmith", "sgarcia", "jbernard", "htanaka", "awalther" ];
  let items = [ "book", "alarm clock", "t-shirts", "gift card", "batteries" ];

  const producer = await createProducer(config, (err, report) => {
    if (err) {
      console.warn('Error producing', err)
    } else {
      const {topic, key, value} = report;
      let k = key.toString().padEnd(10, ' ');
      console.log(`Produced event to topic ${topic}: key = ${k} value = ${value}`);
    }
  });

  let numEvents = 10;
  for (let idx = 0; idx < numEvents; ++idx) {
    const key = users[Math.floor(Math.random() * users.length)];
    const value = Buffer.from(items[Math.floor(Math.random() * items.length)]);

    producer.produce(topic, -1, value, key);
  }

  producer.flush(10000, () => {
    producer.disconnect();
  });
}

produceExample()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
  });

  const Kafka = require('@confluentinc/kafka-javascript');
require("dotenv").config();

function createConsumer(config, onData) {
  const consumer = new Kafka.KafkaConsumer(config, {'auto.offset.reset': 'earliest'});

  return new Promise((resolve, reject) => {
    consumer
     .on('ready', () => resolve(consumer))
     .on('data', onData);

    consumer.connect();
  });
};


async function consumerExample() {
  const config = {
    // User-specific properties that you must set
    'bootstrap.servers': process.env.BOOTSTRAP_SERVERS,
    'sasl.username':     process.env.CLUSTER_API_KEY,
    'sasl.password':     process.env.CLUSTER_API_SECRET,

    // Fixed properties
    'security.protocol': 'SASL_SSL',
    'sasl.mechanisms':   'PLAIN',
    'group.id':          'kafka-javascript-getting-started'
  }

  let topic = "purchases";

  const consumer = await createConsumer(config, ({key, value}) => {
    let k = key.toString().padEnd(10, ' ');
    console.log(`Consumed event from topic ${topic}: key = ${k} value = ${value}`);
  });

  consumer.subscribe([topic]);
  consumer.consume();

  process.on('SIGINT', () => {
    console.log('\nDisconnecting consumer ...');
    consumer.disconnect();
  });
}

consumerExample()
  .catch((err) => {
    console.error(`Something went wrong:\n${err}`);
    process.exit(1);
  });