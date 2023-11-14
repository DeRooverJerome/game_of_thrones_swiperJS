// const { randomUUID } = require("crypto");
const express = require("express");
const uuid = require("uuid");
const myUUID = uuid.v4();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let users = [];

// Get all users
app.get("/api/users", (req, res) => {
  if (users.length === 0) {
    res.json({ message: "No users in the database" });
  } else {
    res.json({ users });
  }
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const foundUser = users.find((user) => user.id === req.params.id);
  if (!foundUser) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(foundUser);
});

// Add a new user
app.post("/api/users", (req, res) => {
  const { username, firstName, lastName, age, isAdmin } = req.body;
  if (!username || !firstName || !lastName || !age || isAdmin === undefined) {
    return res
      .status(400)
      .json({ error: "All required fields are not filled" });
  }

  const newUser = {
    id: uuid.v4(),
    username,
    firstName,
    lastName,
    age,
    isAdmin,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user by ID
app.put("/api/users/:id", (req, res) => {
  const { username, firstName, lastName, age, isAdmin } = req.body;
  const foundUserIndex = users.findIndex((user) => user.id === req.params.id);
  if (foundUserIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  if (!username || !firstName || !lastName || !age || isAdmin === undefined) {
    return res
      .status(400)
      .json({ error: "All required fields are not filled" });
  }

  users[foundUserIndex] = {
    id: req.params.id,
    username,
    firstName,
    lastName,
    age,
    isAdmin,
  };

  res.json(users[foundUserIndex]);
});

// Delete user by ID
app.delete("/api/users/:id", (req, res) => {
  const foundUserIndex = users.findIndex((user) => user.id === req.params.id);
  if (foundUserIndex === -1) {
    res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ succes: "User deleted" });
  users.splice(foundUserIndex, 1);
  res.sendStatus(204);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
