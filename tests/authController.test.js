const request = require('supertest');
const app = require('../server'); // Assuming your server file is in the parent directory
const { User } = require('../models'); // Assuming you have a User model

describe('Authentication and Profile Management', () => {
  let authToken;

  beforeAll(async () => {
    // Create a test user
    await createUser();
  });

  it('should register a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'password123',
    };

    const response = await request(app)
      .post('/auth/register')
      .send(newUser);

    expect(response.statusCode).toEqual(201);
    expect(response.body.token).toBeDefined();
  });

  it('should login an existing user', async () => {
    const credentials = {
      username: 'testuser',
      password: 'password123',
    };

    const response = await request(app)
      .post('/auth/login')
      .send(credentials);

    expect(response.statusCode).toEqual(200);
    expect(response.body.token).toBeDefined();

    authToken = response.body.token; // Store the token for subsequent requests
  });

  it('should get user profile', async () => {
    const response = await request(app)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.username).toBeDefined();
  });

  it('should update user profile', async () => {
    const updatedData = {
      username: 'newusername',
      password: 'newpassword',
    };

    const response = await request(app)
      .put('/auth/profile')
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedData);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('Profile updated successfully');
  });

  it('should delete user profile', async () => {
    const response = await request(app)
      .delete('/auth/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toEqual('User deleted successfully');
  });
});

// Function to create a test user (replace with your actual user creation logic)
const createUser = async () => {
  await User.create({
    username: 'testuser',
    password: '$2a$10$RgCNvw6OkzJHwpAj5FmVzujZK9NTJk7XV1o.7chZO8K0yAC5lGiQK', // Hashed password for 'password123'
  });
};
