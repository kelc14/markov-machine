// local
const MarkovMachine = require("./markov");

describe("testing make chains", function () {
  {
    test("return set with each word in the sentence with next possible words", function () {
      let mm = new MarkovMachine("the cat in the hat");
      length = Object.keys(mm.chains).length;
      expect(length).toBe(4);
    });
  }
});
