const { errorResponse, successResponse } = require("../utils/lambda-response");
const PeopleService = require("../services/PeopleService");

module.exports.handler = async (event) => {
  let result;
  try {
    const request = event;
    const action = event.action || "";

    switch (action) {
      case "getAll":
        result = PeopleService.getAll();
        break;
      case "create":
        result = PeopleService.create(request);
        break;
      case "getOne":
        result = PeopleService.getOne(request);
        break;
      case "update":
        result = PeopleService.update(request);
        break;
      case "delete":
        result = PeopleService.delete(request);
      default:
        result = successResponse({});
    }
  } catch (e) {
    console.log("error", e);
    result = errorResponse({ message: "Error interno.", data: null });
  }
  return result;
};
