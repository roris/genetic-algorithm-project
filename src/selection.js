import * as Gender from './gender';

export const cullOldMales = (males) => {
  return males.filter(value => {
    return value.age <= 18;
  });
};

export const cullOldFemales = (females) => {
  return females.filter(value => {
    return value.age <= 5;
  });
};

export const genderLimit = (numFemales, numMales, maxPopulation) => {
  if (numFemales + numMales <= maxPopulation) {
    return [numFemales, numMales];
  }

  if (numMales >= numFemales) {
    return genderLimit(numFemales, Math.floor(numMales * 0.75), maxPopulation);
  }

  return genderLimit(Math.floor(numFemales * 0.75), numMales, maxPopulation);
};


// a fitness of zero means that the fitness has been achieved
export const evaluateFitness = (genome, target) => 
{
  let fitness = 0;

  for(let i = 0; i < genome[0].length; ++i) {
    const a = genome[0][i];
    const b = genome[1][i];
    const c = target[0][i];
    const d = target[1][i];
    
    fitness += ((a.id === c) ? 0 : 1);
    fitness += (((b !== undefined && b.id === d) || (b === undefined && d === undefined)) ? 0 : 1);
  }

  return fitness;
};