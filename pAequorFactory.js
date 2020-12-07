// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Creates an object
const pAequorFactory = (num, arr) => {
  return {
    specimenNum: num,
    dna: arr,
    mutate() {
      let base_index = Math.floor(Math.random() * this.dna.length);
      let base;
      do {
        base = returnRandBase();
      } while (base === this.dna[base_index]);
      this.dna[base_index] = base;
      return this.dna;
    },
    compareDNA(obj) {
      let equal = 0;
      for (i in obj.dna) {
        if (obj.dna[i] === this.dna[i]) {
          equal++;
        }
      }
      let percentage = Math.round((equal / obj.dna.length) * 100);
      console.log(
        `specimen #${this.specimenNum} and specimen #${obj.specimenNum} have ${percentage}% DNA in common.`
      );
    },

    willLikelySurvive() {
      let num = 0;
      for (i in this.dna) {
        if (this.dna[i] === 'C' || this.dna[i] === 'G') {
          num++;
        }
      }
      let percentage = (num / this.dna.length) * 100;
      return percentage >= 60;
    },
  };
};

// Create an array with 30 objects (species that will likely survive)
const survivalSpecies = [];
let specieNumber = 0;
while (survivalSpecies.length < 30) {
  specieNumber++;
  let dna = mockUpStrand();
  let specie = pAequorFactory(specieNumber, dna);
  if (specie.willLikelySurvive()) {
    survivalSpecies.push(specie);
  }
}
console.log(survivalSpecies);
