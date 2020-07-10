const { DDP } = require("api-ddp");

module.exports = class DDPController {
  constructor(config) {
    this.ddp = new DDP(config);
  }

  async request(collectionName, subscriptionName, filter) {
    return await this.ddp.getElements(collectionName, subscriptionName, filter);
  }

  async connect() {
    return await this.ddp.connect();
  }

  observe(collectionName, subscriptionName, filter, callback) {
    this.ddp.observerCollection(
      collectionName,
      subscriptionName,
      filter,
      (element) => {
        callback(element);
      }
    );
  }
};
