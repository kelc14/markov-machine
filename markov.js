/** Textual markov chain generator */

module.exports = class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    // understanding constructors
    // console.log("this.words", this.words);
    // for (let index in this.words) {
    //   console.log("word:", this.words[index]);
    // }

    // get the first word -  (cycle through words and check to see if they exist in the object yet)
    // collect all indeces for this word in an array
    // then add one to every value in array
    // get all words that exist (index < length)
    // add to an array and add to object

    for (let i = 0; i < this.words.length; i++) {
      // for each word in the phrase, set curr word as"
      let currWord = this.words[i];

      // if the word has NOT been added to the chain object yet .. we will add it:
      if (!this.chains[currWord]) {
        // find indices where word is in phrase
        let currWordIndexes = [];
        for (let j = 0; j < this.words.length; j++) {
          if (this.words[j] === currWord) currWordIndexes.push(j);
        }

        // add one to each index to find index of NEXT word:
        let nextWordIndices = currWordIndexes.map((n) => n + 1);

        // now we have the indices of next words, so use those to get the words from original word array.
        let nextWords = [];
        for (let num in nextWordIndices) {
          // add the words to an array
          nextWords.push(this.words[nextWordIndices[num]]);
        }
        // set key value pair as current word and the array of next words
        this.chains[currWord] = nextWords;
      }
    }
  }

  /** return random text from chains */

  makeText(numWords = 1000) {
    // TODO
    // set up the array for our new words that will be added in order

    let newWordsArray = [];
    // randomly pick starting word and add to our array:
    let randStartIndex = Math.floor(Math.random() * this.words.length);
    newWordsArray.push(this.words[randStartIndex]);

    // get the next word based on index of last word in array and add it to the sentence array
    // infinite loop until the next words list is null/undefined
    while (true) {
      let nextWords = this.chains[newWordsArray[newWordsArray.length - 1]];
      if (!nextWords || newWordsArray.length >= numWords) {
        return console.log(newWordsArray.join(" "));
      }
      let randWordIndex = Math.floor(Math.random() * nextWords.length);
      newWordsArray.push(nextWords[randWordIndex]);
    }
  }
};

// // to instantiate it
// let mm = new MarkovMachine("the cat in the hat");

// mm.makeText();

// // controls max number of words
// mm.makeText((numWords = 50));
