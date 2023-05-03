/** Command-line tool to generate Markov text. */
// native
const fs = require("fs");
const process = require("process");

// local
const MarkovMachine = require("./markov");

// installs
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    // console.log(data);
    let mm = new MarkovMachine(data);
    mm.makeText();
  });
}

async function webCat(url) {
  try {
    response = await axios.get(url);
    // console.log(response.data);
    let mm = new MarkovMachine(response.data);
    mm.makeText();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

if (process.argv[2] === "url") {
  webCat(process.argv[3]);
} else if (process.argv[2] === "file") {
  cat(process.argv[3]);
} else {
  console.error(`Unknown method: ${process.argv[3]}`);
  process.exit(1);
}
