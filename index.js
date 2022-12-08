const express = require("express");
const app = express();
const axios = require("axios").default;
const Swal = require("sweetalert2");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

//ROTA DE CADASTRO DE CATEGORIAS
app.get("/cadastroClientes", (req, res) => {
  res.render("cliente/index");
});

app.get("/listagemClientes", (req, res) => {
  const urlListagemCliente = "http://localhost:4800/listar";

  axios.get(urlListagemCliente).then((response) => {
    let cliente = response.data;
    res.render("cliente/listagemClientes", { cliente });
  });
});

app.get("/formEdicaoClientes/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);

  const urlListagemCliente = `http://localhost:4800/listarClientes/${id}`;

  axios.get(urlListagemCliente).then((response) => {
    let cliente = response.data;
    res.render("cliente/editarClientes", { cliente });
  });
});

app.post("/alterarClientes", (req, res) => {
  const urlListagemCliente = "http://localhost:4800/alterarClientes";
  console.log(req.body);

  axios.put(urlListagemCliente, req.body).then(res.send("Cliente Alterado!"));
});

app.get("/excluirCliente/:id", (req, res) => {
  let id = req.params.id;
  const urlDeletarCliente = `http://localhost:4800/excluirClientes/${id}`;
  axios.delete(urlDeletarCliente, req.body).then(res.send("Cliente Deletado!"));
});

app.listen(3001, () => {
  console.log("servidor em: http://localhost:3001");
});
