const { ConsumerGroup } = require('kafka-node');
const avro = require('avsc');
const request = require('../../REST/requests');
const config = require('../../../config.json');

const kafkaHost = `${config.kafkaBrokers}`;

const options = {
    kafkaHost, 
    ssl: false,
    groupId: 'automationTestGroup',
    sessionTimeout: 15000,
    encoding: 'buffer', // default is utf8, use 'buffer' for binary data
    fromOffset: 'latest',
};

/* 
* It's possible to pass an Array of topics:
* const consumer = new ConsumerGroup(options, ['topic-1', 'topic2']);
* Topics are being consumed in different consumer groups because of CQRS Framework
* If you want to know more about consume topics, please refer to documentation
* https://www.npmjs.com/package/kafka-node#consumergroup
*/
lastKafkaMessage = null;

const consumerCQRSFramework = new ConsumerGroup(options, `${config.envPrefix}-ms.library.event`);
const consumer = new ConsumerGroup(options, `${config.envPrefix}-ms-library-LibraryStateStateStore-changelog`);

consumerCQRSFramework.on('message', async (message) => {
    const topicInfo = await request.get(`${config.schemaRegistryURL}/subjects/${message.topic}-value/versions/latest`);
    const schema = JSON.parse(topicInfo.schema);
    const avroSerialize = avro.Type.forSchema(schema);
       
    const deserializedMessage = avroSerialize.fromBuffer(Buffer.from(message.value, 'binary').slice(5)).domainObject;
    
    lastKafkaMessage = deserializedMessage;
})

consumer.on('message', async (message) => {
    const topicInfo = await request.get(`${config.schemaRegistryURL}/subjects/${message.topic}-value/versions/latest`);
    
    const schema = JSON.parse(topicInfo.schema);
    const avroSerialize = avro.Type.forSchema(schema);
       
    const deserializedMessage = avroSerialize.fromBuffer(Buffer.from(message.value, 'binary').slice(5));
    
    lastConsumerMessage = deserializedMessage;
})


module.exports = {
    consumerCQRSFramework,
    consumer,
    lastKafkaMessage
};