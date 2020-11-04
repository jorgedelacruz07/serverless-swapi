const AWS = require('aws-sdk');

class Model {
  constructor() {
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }
}

module.exports = Model;
