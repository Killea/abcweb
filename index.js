const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://fbms:AUqLM.9S4EW26.R@cluster0.f5rok.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })


const pathPrefix = `${__dirname}/dist`;
const distFolders = [
  pathPrefix,
  `${pathPrefix}/css`,
  `${pathPrefix}/img`,
  `${pathPrefix}/js`,
  `${pathPrefix}/fonts`,
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
    path: "/",
    handler: (r, h) => {
      return h.file(`${pathPrefix}/index.html`);
    },
  });



  server.route({
    method: "GET",
    path: "/api/get_collection",
    handler: async (r, h) => {
      const collection = await client.db('test').collection('test_collection')
      await client.connect()
      const result = await collection.find({}).toArray()
      client.close()
      return result;
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
