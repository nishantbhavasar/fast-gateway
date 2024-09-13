import dotenv from "dotenv";
import express from "express";
import fastgateway from "fast-gateway";
dotenv.config();

// ================================
const server = fastgateway({
  routes: [
    {
      prefix: "/api/api/v1",
      target: `http://localhost:${8081}/`,
    },
    {
      prefix: "/api/api/v2",
      target: `http://localhost:${8081}/`,
    },
    {
      prefix: "/api/api/v3",
      target: `http://localhost:${8082}/`,
    },
  ],
});

server
  .get("/", (req, res) => {
    res.send("Gateway index");
  })
  .get("/about", (req, res) => {
    res.send("Gateway about");
  })
  .use((req, res) => {
    res.send("Not Found");
  });

server.start(8080).then((server) => {
  console.log("Gateway is running at http://localhost:" + 8080);
});
// ================================

function server1() {
  const server1 = express();

  server1.get("/", (req, res) => {
    res.send("server 1");
  });
  server1.get("/list", (req, res) => {
    res.send("server 1 list");
  });
  server1.use((req, res) => {
    res.send("Server 1 Not Found");
  });
  server1.listen(8081, () => {
    console.log("Server is running on port 8081");
  });
}

function server2() {
  const server2 = express();

  server2.get("/", (req, res) => {
    res.send("server 2 list");
  });
  server2.get("/list", (req, res) => {
    res.send("server 2 list");
  });
  server2.use((req, res) => {
    res.send("Server 2 Not Found");
  });
  server2.listen(8082, () => {
    console.log("Server is running on port 8082");
  });
}

server1();
server2();
