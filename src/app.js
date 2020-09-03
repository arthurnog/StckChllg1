const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.query;

  return response.json({ title, url, techs });
});

app.post("/repositories", (request, response) => {
  const { title, url, techs, likes } = request.body;

  const repository = { id: uuid(), title, url, techs, likes };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const Index = projects.findIndex(project => project.id == id);

  if (Index < 0) {
    return response.status(400).json({ erro: 'Repository not found' })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories[Index] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const Index = repositories.findIndex(repository => repository.id == Index);

  if (Index < 0) {
    return response.status(400).json({ erro: 'Repository not found.' })
  }

  repositories.splice(Index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const { title, url, techs, likes } = request.body;

  const Index = projects.findIndex(project => project.id == id);

  if (Index < 0) {
    return response.status(400).json({ erro: 'Repository not found' })
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: likes +1,
  };

  repositories[Index] = repository;

  return response.json(repository);
});

module.exports = app;
