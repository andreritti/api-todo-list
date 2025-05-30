import express from "express";
const server = express();
const port = 3000;

server.use(express.json());

let tarefas = [
  {
    "id": 1,
    "titulo": "Estudar JavaScript",
    "concluido": false
  }, {
    "id": 2,
    "titulo": "Fazer compras",
    "concluido": true
  }, {
    "id": 3,
    "titulo": "Ir à academia",
    "concluido": false
  }
];

let ultimoId = tarefas.length;

server.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

server.post("/tarefas", (req, res) => {
  console.log("Cadastrando nova tarefa: ", req.body);
  ultimoId++;
  req.body.id = ultimoId;
  tarefas.push(req.body);
  res.sendStatus(201);
});

server.get("/tarefas/:id", (req, res) => {
  const indexTarefa = tarefas.findIndex(tarefa => tarefa.id === Number(req.params.id));

  if (indexTarefa === -1) {
    res.sendStatus(404);
  } else {
    res.json(tarefas[indexTarefa]);
  }
});

server.patch("/tarefas/:id", (req, res) => {
  const indexTarefa = tarefas.findIndex(tarefa => tarefa.id === Number(req.params.id));

  if (indexTarefa === -1) {
    res.sendStatus(404);
  } else {
    req.body.id = tarefas[indexTarefa].id;
    tarefas[indexTarefa] = req.body;
    res.json(tarefas[indexTarefa]);
  }
});

server.delete("/tarefas/:id", (req, res) => {
  const indexTarefa = tarefas.findIndex(tarefa => tarefa.id === Number(req.params.id));
  if (indexTarefa === -1) {
    res.sendStatus(404);
  } else {
    tarefas.splice(indexTarefa, 1);
    res.sendStatus(200);
  }
});

server.listen(port, () => console.log("Meu servidor está funcionando na port:", port));
