const request = require('supertest');
const app = require('./src/server'); // Assuming your server file is in the parent directory
const { User } = require('./src/models/User'); // Assuming you have a User model

describe('Profile Controller', () => {
  let authToken;

  beforeAll(async () => {
    // Create a test user and get JWT token for authentication
    const user = await createUser();
    const response = await request(app)
      .post('/auth/login')
      .send({ username: user.username, password: 'password123' });

    authToken = response.body.token;
  });

  it('should get user profile', async () => {
    const response = await request(app)
      .get('/auth/profile')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.username).toBeDefined(); // Assuming username is returned in the profile
  });

  it('should update user profile', async () => {
    const updatedData = { username: 'newusername' };

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
  const user = await User.create({
    username: 'testuser',
    password: 'password123',
  });

  return user;
};
