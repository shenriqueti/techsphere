# 🌐 TechSphere — Festival de Inovação & Tecnologia

Plataforma **Full-Stack** para gestão de eventos de tecnologia. O projeto oferece cadastro de usuários, empresas e eventos, autenticação segura com bcrypt e 2FA, além de um painel administrativo para controle de dados.

---

## 🛠️ Tecnologias

| Camada          | Tecnologias                                      |
|-----------------|--------------------------------------------------|
| **Back-end**    | Node.js, Express, Firebase Admin SDK (Firestore)  |
| **Segurança**   | bcrypt (hash de senhas), dotenv (variáveis de ambiente) |
| **Front-end**   | HTML5, CSS3, JavaScript Vanilla                   |
| **APIs Externas** | ViaCEP (busca automática de endereço)           |
| **Bibliotecas** | Inputmask, Font Awesome                           |

---

## 🚀 Como Executar

### Pré-requisitos
- **Node.js** (v16 ou superior)
- Credencial do Firebase (`serviceAccountKey.json`) na raiz do projeto
- Gerenciador de pacotes npm

### Passos

1. **Clone o repositório** e acesse a pasta do projeto:
   ```bash
   git clone https://github.com/shenriqueti/techsphere.git
   cd techsphere
   ```

2. **Configure as variáveis de ambiente** — crie um arquivo `.env` na raiz:
   ```env
   PORT=3000
   SALT_ROUNDS=10
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Inicie o servidor**:
   ```bash
   node server.js
   ```

5. **Acesse no navegador**: [http://localhost:3000](http://localhost:3000)

> ⚠️ Os arquivos **`.env`** e **`serviceAccountKey.json`** estão no `.gitignore` e **não devem ser versionados** — contêm credenciais sensíveis.

---

## ✨ Funcionalidades Principais

- 🔐 **Autenticação Segura** — Hash de senhas com bcrypt (salt rounds configuráveis) e desafio 2FA pós-login
- 👤 **Cadastro de Usuários** — Validação completa (CPF, e-mail, nome, endereço) com busca automática de CEP via ViaCEP
- 🏢 **Cadastro de Empresas** — Formulário dedicado com campos de CNPJ, horário e login opcional
- 🎫 **Cadastro de Eventos** — Registro de eventos com nome, datas, descrição e link de ingresso
- 🛡️ **Dashboard Administrativo (Master)** — Listagem e exclusão de usuários, consulta de logs de autenticação com proteção por headers
- 🌗 **Tema Claro/Escuro** — Alternância de tema salva em `localStorage`
- 📱 **Responsivo** — Layout adaptável a dispositivos móveis, tablets e desktops
- 🔎 **Busca e Filtros** — Filtros por categoria nos cards de eventos e pesquisa textual no painel admin

---

## 📁 Estrutura do Projeto

```
techsphere/
├── server.js                     # Servidor Express (rotas, middleware, Firestore)
├── .env                          # Variáveis de ambiente (não versionado)
├── serviceAccountKey.json        # Chave privada Firebase (não versionado)
├── package.json
├── README.md
└── public/
    ├── index.html                # Landing page principal
    ├── login.html                # Tela de login
    ├── cadastro.html             # Cadastro de usuário (comum)
    ├── cadastroUsuario.html      # Cadastro alternativo de usuário
    ├── cadastroEmpresa.html      # Cadastro de empresa
    ├── cadastroEvento.html       # Cadastro de evento
    ├── 2fa.html                  # Validação de segundo fator
    ├── area-usuario.html         # Área do usuário (edição de perfil)
    ├── dashboard-master.html     # Painel administrativo (Master)
    ├── Eventos.html              # Página de eventos com busca
    ├── css/
    │   └── styles.css            # Estilos globais (1449 linhas)
    ├── js/
    │   ├── script.js             # Slideshow, modais, filtros
    │   ├── login.js              # Lógica de autenticação
    │   ├── cadastro.js           # Validação e envio de cadastro
    │   ├── area-usuario.js       # Edição de dados e alteração de senha
    │   ├── cadastro-empresa.js   # Envio de formulário de empresa
    │   └── cadastro-evento.js    # Envio de formulário de evento
    └── images/                   # Assets visuais (logos, banners, fotos)
```

---

## 🔗 Endpoints da API

| Método   | Rota                      | Descrição                        | Proteção    |
|----------|---------------------------|----------------------------------|-------------|
| `GET`    | `/`                       | Página inicial                   | —           |
| `POST`   | `/api/cadastro`           | Cadastrar usuário                | —           |
| `POST`   | `/api/login`              | Autenticar usuário               | —           |
| `POST`   | `/api/2fa`                | Validar segundo fator            | —           |
| `GET`    | `/api/meus-dados/:id`      | Buscar dados do usuário          | —           |
| `PUT`    | `/api/meus-dados/:id`      | Atualizar dados do usuário       | —           |
| `PUT`    | `/api/alterar-senha/:id`   | Alterar senha                    | —           |
| `POST`   | `/api/cadastro-empresa`   | Cadastrar empresa                | —           |
| `POST`   | `/api/cadastro-evento`    | Cadastrar evento                 | —           |
| `GET`    | `/api/usuarios`           | Listar usuários                  | 🔒 Master   |
| `DELETE` | `/api/usuarios/:id`       | Excluir usuário                  | 🔒 Master   |
| `GET`    | `/api/logs`               | Logs de autenticação             | 🔒 Master   |

---

## 🔒 Segurança

- Senhas armazenadas com **bcrypt** (hash + salt de 10 rounds)
- Rotas administrativas protegidas via **middleware de autenticação** (headers `x-user-id` e `x-user-perfil`)
- Bloqueio automático de conta após 3 tentativas erradas no 2FA
- Sessão temporária de 2FA expira em 10 minutos
- Dados sensíveis (senha, 2FA, sessão) nunca são expostos nas respostas da API

---

## ⚖️ Licença

Este projeto está sob a licença **MIT**.