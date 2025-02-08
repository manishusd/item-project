const request = require("supertest");
const express = require("express");
const itemsRouter = require("../routes/items");

const app = express();
app.use(express.json());
app.use("/api/items", itemsRouter);

describe("Items API", () => {
  let createdItemId;

  const testItem = {
    name: "Test Item",
    description: "This is a test item description that meets validation",
  };

  test("POST /api/items - should create a new item", async () => {
    const response = await request(app).post("/api/items").send(testItem);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe(testItem.name);
    expect(response.body.description).toBe(testItem.description);

    createdItemId = response.body.id;
  });

  test("GET /api/items - should return all items", async () => {
    const response = await request(app).get("/api/items");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/items/:id - should return a specific item", async () => {
    const response = await request(app).get(`/api/items/${createdItemId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdItemId);
  });

  test("PUT /api/items/:id - should update an item", async () => {
    const updatedItem = {
      name: "Updated Test Item",
      description:
        "This is an updated test item description that meets validation",
    };

    const response = await request(app)
      .put(`/api/items/${createdItemId}`)
      .send(updatedItem);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedItem.name);
    expect(response.body.description).toBe(updatedItem.description);
  });

  test("DELETE /api/items/:id - should delete an item", async () => {
    const response = await request(app).delete(`/api/items/${createdItemId}`);

    expect(response.status).toBe(204);
  });

  test("POST /api/items - should validate item data", async () => {
    const invalidItem = {
      name: "a", // too short
      description: "too short",
    };

    const response = await request(app).post("/api/items").send(invalidItem);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
