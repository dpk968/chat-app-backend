// models/ChatParticipant.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ChatParticipant = sequelize.define('ChatParticipant', {});

module.exports = ChatParticipant;
