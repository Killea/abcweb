const pathPrefix = `./dist`
const distFolders = [pathPrefix, `${pathPrefix}/css`, `${pathPrefix}/img`, `${pathPrefix}/js`];
const Hapi = require("@hapi/hapi");
const fs = require("fs");

const isFolder = (path) => fs.lstatSync(path).isDirectory();

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  await server.register(require("@hapi/inert"));
  try {

  
  distFolders.forEach((folder) => {
    fs.readdirSync(folder).forEach((file) => {
      const path = `${folder}/${file}`;
      if (!isFolder(path)) {
        console.log(path);
        const routePath = path.replace(pathPrefix, "");
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
  }
  catch (err) {
    console.log(err)
  }

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      // return h.file(`./server/dist/index.html`);
      return __dirname;
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
