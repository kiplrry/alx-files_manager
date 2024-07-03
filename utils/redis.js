const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (error) => console.log(error))
      .on('connect', () => console.log('wiiiiii'));
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return promisify(this.client.get).bind(this.client)(key);
  }

  async set(key, value, duration) {
    return promisify(this.client.setex)
      .bind(this.client)(key, duration, value);
  }

  async del(key) {
    return promisify(this.client.del)
      .bind(this.client)(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
