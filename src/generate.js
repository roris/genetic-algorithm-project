import * as Gender from './gender';
import {All as Genes} from './loci';
import {v4 as uuid} from 'uuid';

export const randomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
}

const ages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const createWChromosome = (haploid) => {
  haploid.pop();
  haploid.pop();
  haploid.pop();
  haploid.pop();
  haploid.push(undefined);
  haploid.push(undefined);
  haploid.push(undefined);
  haploid.push(undefined);
}

const randomGender = () => {
  return Math.random() < 0.5 ? Gender.Male : Gender.Female;
}

export const generate = (gender = randomGender()) => {
  const genome = [new Array(Genes.length), new Array(Genes.length)];

  Genes.forEach((gene, i) => {
    const a = randomItem(gene.mutants);
    const b = randomItem(gene.mutants);

    genome[0][i] = {
      id: a.id,
      symbol: gene.symbol,
      mutation: a.mutation,
    };

    genome[1][i] = {
      id: b.id,
      symbol: gene.symbol,
      mutation: b.mutation,
    };
  });

  if (gender === Gender.Female) {
    createWChromosome(genome[1]);
  }

  const result = { 
    uuid: uuid(), 
    generation: 0,
    age: randomItem(ages), 
    gender: gender, 
    genome: genome, 
    fitness: 0 , 
    father: null, 
    mother: null
  };

  return result;
}