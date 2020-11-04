const PeopleController = require("../../src/controllers/PeopleController");

it("Test Fn(handler - getAll)", async () => {
  const event = {
    headers: {},
    path: "/people",
    pathParameters: {},
    requestContext: {},
    resource: "/people",
    httpMethod: "GET",
    queryStringParameters: null,
    stageVariables: null,
    body: "",
    isOffline: true,
  };

  const data = await PeopleController.handler(event);
  expect(data.statusCode).toBe(200);
});

it("Test Fn(handler - create)", async () => {
  const event = {
    headers: {},
    path: "/people",
    pathParameters: {},
    requestContext: {},
    resource: "/people",
    httpMethod: "POST",
    queryStringParameters: null,
    stageVariables: null,
    body:
      '{"birth_year": "19 BBY", "eye_color": "Blue", "films": [], "gender": "Male", "hair_color": "Blond", "height": "172", "homeworld": "https://swapi.py4e.com/api/planets/1/", "mass": "77", "name": "Luke Skywalker", "skin_color": "Fair", "species": [], "starships": [], "url": "https://swapi.py4e.com/api/people/1/", "vehicles": []}',
    isOffline: true,
  };

  const data = await PeopleController.handler(event);
  expect(data.statusCode).toBe(200);
});

it("Test Fn(hanlder - update)", async () => {
  const event = {
    headers: {},
    path: "/people/7fa6ea78-7875-4ecd-9588-c4b14264453d",
    pathParameters: {},
    requestContext: {},
    resource: "/people/{id}",
    httpMethod: "PUT",
    queryStringParameters: null,
    stageVariables: null,
    body: '{"height": "180"}',
    isOffline: true,
  };

  const data = await PeopleController.handler(event);
  expect(data.statusCode).toBe(200);
});
