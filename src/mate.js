import { randomItem } from './generate';
import * as Gender from './gender';
import { All as Genes, Ino, Cinnamon, Slate, Opaline, Blue, DarkFactor } from './loci';
import {v4 as uuid} from 'uuid';

const crossover = (gametes, gametocyte, rate, a, b) => {
  if (Math.random() < rate) {
    if (Math.random() < 0.5) {
      gametes[0][a] = gametocyte[0][a];
      gametes[1][a] = gametocyte[1][a];
      gametes[1][b] = gametocyte[0][b];
      gametes[0][b] = gametocyte[1][b];
    } else {
      gametes[0][a] = gametocyte[1][a];
      gametes[1][a] = gametocyte[0][a];
      gametes[1][b] = gametocyte[1][b];
      gametes[0][b] = gametocyte[0][b];
    }
  }
}

const blueDarkCrossover = (gametes, gametocyte) => {
  // chromosome crossover
  if (Math.random() < 0.5) {
    gametes[0][DarkFactor.locus] = gametocyte[1][DarkFactor.locus];
    gametes[0][Blue.locus] = gametocyte[1][Blue.locus];
    gametes[1][DarkFactor.locus] = gametocyte[0][DarkFactor.locus];
    gametes[1][Blue.locus] = gametocyte[0][Blue.locus];
  } else {
    gametes[0][DarkFactor.locus] = gametocyte[0][DarkFactor.locus];
    gametes[0][Blue.locus] = gametocyte[0][Blue.locus];
    gametes[1][DarkFactor.locus] = gametocyte[1][DarkFactor.locus];
    gametes[1][Blue.locus] = gametocyte[1][Blue.locus];
  }

  // gene crossover
  crossover(gametes, gametocyte, 0.14, DarkFactor.locus, Blue.locus);
};

const meiosis = (individual) => {
  const genome = individual.genome;
  const gender = individual.gender;
  const result = [new Array(Genes.length), new Array(Genes.length)];

  // Shuffle genes across haploids. Each gene has a 50% chance of being on
  // the same haploid as in the parent.
  for (let i = 0; i < Genes.length; ++i) {
    if (Math.random() <= 0.5) {
      result[0][i] = genome[0][i];
      result[1][i] = genome[1][i];
    } else {
      result[0][i] = genome[1][i];
      result[1][i] = genome[0][i];
    }
  }

  blueDarkCrossover(result, genome);

  // Z crossover can only happen in males as females have a single Z chromosome
  if (gender === Gender.Male) {
    zCrossover(result, genome);
  } else {
    // No crossover can happen in the Z/W chromosome for females.
    // Retain the original positions. W is always undefined.
    result[0][Ino.locus] = genome[0][Ino.locus];
    result[0][Slate.locus] = genome[0][Slate.locus];
    result[0][Opaline.locus] = genome[0][Opaline.locus];
    result[0][Cinnamon.locus] = genome[0][Cinnamon.locus];
    result[1][Ino.locus] = undefined;
    result[1][Slate.locus] = undefined;
    result[1][Opaline.locus] = undefined;
    result[1][Cinnamon.locus] = undefined;
  }

  return result;
}

const cinnamonInoCrossover = (gametes, gametocyte) => {
  return crossover(gametes, gametocyte, 0.03, Cinnamon.locus, Ino.locus);
}

const cinnamonOpalineCrossover = (gametes, gametocyte) => {
  return crossover(gametes, gametocyte, 0.33, Cinnamon.locus, Opaline.locus);
}

const inoOpalineCrossover = (gametes, gametocyte) => {
  return crossover(gametes, gametocyte, 0.30, Ino.locus, Opaline.locus);
}

const cinnamonSlateCrossover = (gametes, gametocyte) => {
  return crossover(gametes, gametocyte, 0.07, Cinnamon.locus, Slate.locus);
}

const opalineSlateCrossover = (gametes, gametocyte) => {
  return crossover(gametes, gametocyte, 0.40, Opaline.locus, Slate.locus);
}

const slateInoCrossover = (gametes, gametocyte) => {
  return crossover(gametes, gametocyte, 0.1, Slate.locus, Ino.locus);
}

const zCrossover = (gametes, gametocyte) => {
  // chromosome crossover
  if (Math.random() < 0.5) {
    gametes[0][Ino.locus] = gametocyte[0][Ino.locus];
    gametes[0][Slate.locus] = gametocyte[0][Slate.locus];
    gametes[0][Opaline.locus] = gametocyte[0][Opaline.locus];
    gametes[0][Cinnamon.locus] = gametocyte[0][Cinnamon.locus];
    gametes[1][Ino.locus] = gametocyte[1][Ino.locus];
    gametes[1][Slate.locus] = gametocyte[1][Slate.locus];
    gametes[1][Opaline.locus] = gametocyte[1][Opaline.locus];
    gametes[1][Cinnamon.locus] = gametocyte[1][Cinnamon.locus];
  } else {
    gametes[1][Ino.locus] = gametocyte[0][Ino.locus];
    gametes[1][Slate.locus] = gametocyte[0][Slate.locus];
    gametes[1][Opaline.locus] = gametocyte[0][Opaline.locus];
    gametes[1][Cinnamon.locus] = gametocyte[0][Cinnamon.locus];
    gametes[0][Ino.locus] = gametocyte[1][Ino.locus];
    gametes[0][Slate.locus] = gametocyte[1][Slate.locus];
    gametes[0][Opaline.locus] = gametocyte[1][Opaline.locus];
    gametes[0][Cinnamon.locus] = gametocyte[1][Cinnamon.locus];
  }

  // gene crossover
  cinnamonInoCrossover(gametes, gametocyte);
  cinnamonOpalineCrossover(gametes, gametocyte);
  inoOpalineCrossover(gametes, gametocyte);
  cinnamonSlateCrossover(gametes, gametocyte);
  opalineSlateCrossover(gametes, gametocyte);
  slateInoCrossover(gametes, gametocyte);
}

export const mutate = (genome) => {
  // each gene has a 0.001% chance of mutating
  const chance = 0.001;

  Genes.forEach((gene, i) => {
    const a = randomItem(gene.mutants);
    const b = randomItem(gene.mutants);

    if (Math.random() <= chance) {
      genome[0][i] = {
        id: a.id,
        symbol: gene.symbol,
        mutation: a.mutation
      };
    }

    if (Math.random() <= chance) {
      genome[0][i] = {
        id: b.id,
        symbol: gene.symbol,
        mutation: b.mutation
      };
    }
  });
}

export const conceive = (mother, father, gender) => {
  const as = meiosis(mother);
  const bs = meiosis(father);
  const result = new Array(2);

  // Receive genes from the father. Both the haploids contain Z chromosomes, so 
  // it does not matter which is inherited.
  if (Math.random() < 0.5) {
    result[0] = bs[0];
  } else {
    result[0] = bs[1];
  }

  // Receive genes from the mother. The inherited genes depend on the gender,
  // since females must have a W chromosome and males must have a Z chromosome.
  if (gender === Gender.Male) {
    result[1] = as[0];
  } else {
    result[1] = as[1];
  }

  // Mutate the genes in the offspring
  mutate(result);
  
  // Restore W chromosome regardless of mutations
  if (gender === Gender.Female) {
    result[1][Ino.locus] = undefined;
    result[1][Slate.locus] = undefined;
    result[1][Opaline.locus] = undefined;
    result[1][Cinnamon.locus] = undefined;
  }

  return result;
};


// the numbers of offspring that a pair may yield
const clutchSizes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export const mate = (mother, father, generation) => {
  // select a random clutch size
  const clutchSize = randomItem(clutchSizes);
  const sons = [];
  const daughters = [];

  for (let i = 0; i <= clutchSize; ++i) {
    // Each child has 50% chance of being Male or Female
    const gender = ((Math.random() < 0.5) ? Gender.Male : Gender.Female);
    const genome = conceive(mother, father, gender);
    const child = {
      uuid: uuid(),
      generation: generation,
      age: 0,
      gender: gender,
      genome: genome,
      fitness: 0,
      father: father,
      mother: mother
    };

    // push on to the appropriate array to be consumed by the caller
    if (gender === Gender.Male) {
      sons.push(child);
    } else {
      daughters.push(child);
    }
  }

  return [sons, daughters];
};
