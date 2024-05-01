// src/controllers/chatController.js
const kafka = require('kafka-node');
const redis = require('redis');
const { User, Message } = require('../models');

// Initialize Kafka Producer
const kafkaClient = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(kafkaClient);

// Initialize Redis client
const redisClient = redis.createClient();

const sendMessage = async (req, res) => {
  try {
    const { userId, message } = req.body;

    // Check if recipient user exists
    const recipientUser = await User.findByPk(userId);
    if (!recipientUser) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    // Save message to database
    const newMessage = await Message.create({
      senderId: req.userId, // Assuming senderId is stored in req.userId
      recipientId: userId,
      message,
    });

    // Publish message to Kafka
    const payloads = [
      {
        topic: 'messages',
        messages: JSON.stringify(newMessage),
      },
    ];
    producer.send(payloads, function(err, data) {
      if (err) {
        console.error('Error publishing message to Kafka:', err);
      } else {
        console.log('Message published to Kafka:', data);
      }
    });

    // Save message to Redis
    const redisKey = `user:${userId}:messages`;
    redisClient.lpush(redisKey, JSON.stringify(newMessage));

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  sendMessage,
};
