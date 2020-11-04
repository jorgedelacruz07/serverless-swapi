const {
  successResponse,
  errorResponse,
  customResponse,
} = require("../utils/lambda-response");
const PeopleModel = require("../models/People");
const axios = require("axios");

const peopleModel = new PeopleModel();

const swapiURL = process.env.SWAPI_URL;

class PeopleService {
  static async getAll() {
    try {
      const data = await peopleModel.getAll();

      if (Object.keys(data).length === 0) {
        return customResponse(
          {
            message: "Empty",
          },
          404
        );
      } else {
        return successResponse({
          message: "Exito",
          data: data.Items,
        });
      }
    } catch (e) {
      console.log("error", e);
      return errorResponse({ message: "Error Interno", data: null });
    }
  }

  static async create(request) {
    try {
      const params = request;
      const data = await peopleModel.create(params);

      return successResponse({
        message: "Exito",
        data,
      });
    } catch (e) {
      console.log("error", e);
      return errorResponse({ message: "Error Interno", data: null });
    }
  }

  static async getOne(request) {
    try {
      const id = request.id;
      let data = await peopleModel.getOne(id);

      if (Object.keys(data).length !== 0) {
        return successResponse({ message: "Exito", data: data.Item });
      } else {
        console.log("Request to Swar Wars API...");
        await axios
          .get(swapiURL + "/people/" + id)
          .then((res) => {
            data = {
              id,
              ...res.data,
            };
          })
          .catch((e) => {
            console.log("error", e);
          });
        if (Object.keys(data).length !== 0) {
          this.create(data);
          return successResponse({ message: "Exito", data });
        } else {
          return errorResponse({ message: "Error Interno", data: null });
        }
      }
    } catch (e) {
      console.log("error", e);
      return errorResponse({ message: "Error Interno", data: null });
    }
  }

  static async update(request) {
    try {
      const id = request.id;
      const params = request.data;
      const data = await peopleModel.update(id, params);

      return successResponse({ message: "Exito", data: data.Attributes });
    } catch (e) {
      console.log("error", e);
      return errorResponse({ message: "Error Interno", data: null });
    }
  }

  static async delete(request) {
    try {
      const id = request.id;
      const data = await peopleModel.delete(id);

      return successResponse({
        message: "Exito",
        data,
      });
    } catch (e) {
      console.log("error", e);
      return errorResponse({ message: "Error Interno", data: null });
    }
  }
}

module.exports = PeopleService;
