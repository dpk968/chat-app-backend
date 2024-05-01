const request = require('supertest');
const app = require('../server'); // Assuming your server file is in the parent directory
const { User, Message } = require('../models'); // Assuming you have User and Message models

describe('Chat Controller', () => {
  let authToken;
  let recipientUser;

  beforeAll(async () => {
    // Create a test user and get JWT token for authentication
    const user = await createUser();
    const response = await request(app)
      .post('/auth/login')
      .send({ username: user.username, password: 'password123' });

    authToken = response.body.token;

    // Create a recipient user
    recipientUser = await User.create({
      username: 'recipientuser',
      password: 'password456',
    });
  });

  it('should send message to a user', async () => {
    const messageData = {
      userId: recipientUser.id,
      message: 'Hello, recipient!',
    };

    const response = await request(app)
      .post('/chat')
      .set('Authorization', `Bearer ${authToken}`)
      .send(messageData);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Message sent successfully');
  });
});

// Function to create a test user (replace with your actual user creation logic)
const createUser = async () => {
  const user = await User.create({
    username: 'testuser',
    password: 'password123',
  });

  return user;
};
