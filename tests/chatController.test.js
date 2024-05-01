const request = require('supertest');
const app = require('../server'); // Assuming your server file is in the parent directory

describe('Chat Controller', () => {
  it('should send a message to a user and return success', async () => {
    const user = await createUser(); // Create a test user in your database

    const message = {
      userId: user.id,
      message: 'Hello, user!',
    };

    const response = await request(app)
      .post('/auth/chat')
      .set('Authorization', 'Bearer your-jwt-token') // Replace with a valid JWT token
      .send(message);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Message sent successfully');
  });

  it('should return error if recipient user not found', async () => {
    const invalidUserId = 'invalidUserId'; // A user ID that doesn't exist in the database

    const message = {
      userId: invalidUserId,
      message: 'Hello, user!',
    };

    const response = await request(app)
      .post('/auth/chat')
      .set('Authorization', 'Bearer your-jwt-token') // Replace with a valid JWT token
      .send(message);

    expect(response.statusCode).toEqual(404);
    expect(response.body.message).toEqual('Recipient user not found');
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
