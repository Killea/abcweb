const distFolders = ["./dist", "./dist/css", "./dist/img", "./dist/js"];
const Hapi = require("@hapi/hapi");
const fs = require("fs");

const isFolder = (path) => fs.lstatSync(path).isDirectory();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(require("@hapi/inert"));

  distFolders.forEach((folder) => {
    fs.readdirSync(folder).forEach((file) => {
      const path = `${folder}/${file}`;
      if (!isFolder(path)) {
        console.log(path);
        const routePath = path.replace("./dist", "");
        server.route({
          method: "GET",
          path: routePath,
          handler: function (request, h) {
            return h.file(path);
          },
        });
      }
    });
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h.file(`./dist/index.html`);
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
