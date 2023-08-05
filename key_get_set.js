var redis = require("redis");
var client = redis.createClient();

async function App() {
  console.log("running app");
  await client.connect();

  // single value write and read
  await client.set("my_key2", "Hello World2!");
  await client.set("my_key3", 4);
  const reply = await client.get("my_key2");
  console.log(reply);

  // multiple values write and read
  // TODO
  // await client.SET("header", 1, "left", 0);
  await client.mSet("left", "1", "article", "2");
  const result = await client.MGET([
    "my_key",
    "my_key2",
    "my_key3",
    "header",
    "left",
    "article",
  ]);
  console.log(result);
  // const keysClient = await client.scan();
  // console.log(keysClient);

  await client.quit();
  console.log("closing app");
}

App();
