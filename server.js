const express = require("express");
const path = require("path");
const app = express();
const PORT = 30000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post("/api/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "aluno" && senha === "1234") {
    return res
      .status(200)
      .json({ sucesso: true, mensagem: "login liberado", erro: null });
  } else {
    return res.status(401).json({
      sucesso: false,
      mensagem: "usuário ou senha incorretos",
      erro: "usuário ou senha incorretos",
    });
  }
});
