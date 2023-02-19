// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {
      const randomIndex = Math.floor(
        Math.random() * this.dna.length
      );

      let randomBase = this.dna[randomIndex];

      const dnaBases = ['A', 'T', 'C', 'G'];

      const availableBases = dnaBases.filter(
        base => base !== randomBase
      );

      const newRandomBase =
        availableBases[
          Math.floor(
            Math.random() * availableBases.length
          )
        ];

      this.dna[randomIndex] = newRandomBase;

      return this.dna;
    },
    compareDNA(pAequor) {
      let amount = 0;

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          amount++;
        }
      }

      const inCommon = (amount / this.dna.length) * 100;

      console.log(
        `specimen #${this.specimenNum} and specimen #${
          pAequor.specimenNum
        } have ${Math.round(inCommon)}% DNA in common`
      );

      return inCommon;
    },
    willLikelySurvive() {
      const survivalBases = this.dna.filter(
        base => base === 'C' || base === 'G'
      );

      return (
        survivalBases.length / this.dna.length >= 0.6
      );
    },
    complementStrand() {
      return this.dna.map(base => {
        switch (base) {
          case 'A':
            return 'T';
          case 'T':
            return 'A';
          case 'C':
            return 'G';
          case 'G':
            return 'C';
        }
      });
    }
  };
};

const survivors = [];
let specimenNum = 1;

do {
  const specimenDna = mockUpStrand();
  const specimen = pAequorFactory(
    specimenNum,
    specimenDna
  );

  if (specimen.willLikelySurvive()) {
    survivors.push(specimen);
  }

  specimenNum++;
} while (survivors.length < 30);

const mostRelated = instances => {
  let highestPercentage = 0;
  let mostRelatedInstances = [];

  for (let i = 0; i < instances.length; i++) {
    for (let j = i + 1; j < instances.length; j++) {
      const percentageInCommon = instances[i].compareDNA(
        instances[j]
      );

      if (percentageInCommon > highestPercentage) {
        highestPercentage = percentageInCommon;
        mostRelatedInstances = [
          instances[i],
          instances[j]
        ];
      } else if (
        percentageInCommon === highestPercentage
      ) {
        mostRelatedInstances.push([
          instances[i],
          instances[j]
        ]);
      }
    }
  }

  return mostRelatedInstances;
};

console.log(mostRelated(survivors));
