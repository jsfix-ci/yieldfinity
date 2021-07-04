const glob = require("glob");
const fs = require("fs");

glob("../dist/**/*.d.ts", {}, (err, files) => {

  const models = files.map(file => {
    return ({
      value: fs.readFileSync(file, "utf8"),
      filename: file.replace('../dist/', 'file:///node_modules/yieldfinity/'),
      language: "typescript"
    })
  })
  fs.writeFileSync("yieldfinity.json", JSON.stringify(models))
})

/**
 * [{"value":"console.log(\"make a new file\")","filename":"new.ts","language":"typescript"}]
 * */