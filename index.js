const pathPrefix = `${__dirname}/dist`;
const distFolders = [
  pathPrefix,
  `${pathPrefix}/css`,
  `${pathPrefix}/img`,
  `${pathPrefix}/js`,
];
const Hapi = require("@hapi/hapi");
const fs = require("fs");

const isFolder = (path) => fs.lstatSync(path).isDirectory();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  const tmp = [];
  await server.register(require("@hapi/inert"));
  try {
    distFolders.forEach((folder) => {
      fs.readdirSync(folder).forEach((file) => {
        const path = `${folder}/${file}`;
        if (!isFolder(path)) {
          const routePath = path.replace(`${pathPrefix}`, "");
          console.log(routePath, path);
          tmp.push({ [routePath]: path });
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
  } catch (err) {
    console.log(err);
  }

  server.route({
    method: "GET",
    path: "/path",
    handler: (request, h) => {
      return h.file(__dirname + `/dist/index.html`);
    },
  });

  server.route({
    method: "GET",
    path: "/",
    handler: () => {
      return { a: JSON.stringify(tmp) };
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
