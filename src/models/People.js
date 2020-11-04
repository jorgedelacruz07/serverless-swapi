const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const Model = require("./Model");

const TABLE_NAME = process.env.TABLE_NAME_PEOPLE;

class PeopleModel extends Model {
  async getAll() {
    const params = {
      TableName: TABLE_NAME,
    };
    return await this.dynamoDb.scan(params).promise();
  }

  async create(data) {
    // const id = uuidv4();
    // const timestamp = moment().format("X");
    const params = {
      TableName: TABLE_NAME,
      Item: data,
    };
    return await this.dynamoDb.put(params).promise();
  }

  async getOne(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    return await this.dynamoDb.get(params).promise();
  }

  async update(id, data) {
    const timestamp = moment().format("X");
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
      UpdateExpression: "set height = :h",
      ExpressionAttributeValues: {
        ":h": data.height,
      },
      ReturnValues: "UPDATED_NEW",
    };
    return await this.dynamoDb.update(params).promise();
  }

  async delete(id) {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    return await this.dynamoDb.delete(params).promise();
  }
}

module.exports = PeopleModel;
