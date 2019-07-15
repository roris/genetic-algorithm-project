import * as Gender from './gender';
import * as Loci from './loci';
import { generate } from './generate';
import { cullOldMales, cullOldFemales, genderLimit, evaluateFitness } from './selection';
import { mate } from './mate';
import { drawGraph } from './graph'

const compareIndividuals = (a, b) => { return a.fitness - b.fitness; };

const getTargetGenome = (target) => {
  const numGenes = Loci.All.length;
  const genome = [new Array(numGenes), new Array(numGenes)];

    // for easy copying
    if (target.gender === Gender.Female) {
      target.genes[1].push(undefined);
      target.genes[1].push(undefined);
      target.genes[1].push(undefined);
      target.genes[1].push(undefined);
    }

    for (let i = 0; i < Loci.All.length; ++i) {
      const a = target.genes[0][i];
      const b = target.genes[1][i];

      genome[0][i] = a.mutants[a.active].id;
      genome[1][i] = b ? b.mutants[b.active].id : b;
    }

    // Remove the unused genes :)
    if (target.gender === Gender.Female) {
      target.genes[1].pop();
      target.genes[1].pop();
      target.genes[1].pop();
      target.genes[1].pop();
    }

    return genome;
}

export class App {
  constructor() {
    Loci.All.forEach((value) => {
      this.target.genes[0].push({ locus: value.locus, symbol: value.symbol, mutants: value.mutants, active: 0 });
      this.target.genes[1].push({ locus: value.locus, symbol: value.symbol, mutants: value.mutants, active: 0 });
    });
  }

  generation = 0;
  fitness = 0;
  males = [];
  females = [];

  initialMales = [];
  initialFemales = [];
  initialMaleAges = [];
  initialFemaleAges = [];

  parameters = { initial: 10, maximum: 200, breeders: 10, generations: 40 };

  genders = [
    { id: Gender.Male, name: "Male" },
    { id: Gender.Female, name: "Female" }
  ]

  target = {
    gender: Gender.Male,
    genes: [[], []]
  };

  fittest = [[], []];
  isRunning = false;

  get canStart() {
    return !this.isRunning && this.initialMales.length != 0 && this.initialFemales.length != 0;
  }

  get pairLimit() {
    return Math.floor(this.parameters.maximum/4);
  }

  targetGenderChanged(gender) {
    if (this.isRunning) {
      return;
    }

    if (gender === Gender.Male) {
      this.target.genes[1].push({ locus: Loci.Slate.locus,    symbol: Loci.Slate.symbol,    mutants: Loci.Slate.mutants,    active: 0 });
      this.target.genes[1].push({ locus: Loci.Cinnamon.locus, symbol: Loci.Cinnamon.symbol, mutants: Loci.Cinnamon.mutants, active: 0 });
      this.target.genes[1].push({ locus: Loci.Ino.locus,      symbol: Loci.Ino.symbol,      mutants: Loci.Ino.mutants,      active: 0 });
      this.target.genes[1].push({ locus: Loci.Opaline.locus,  symbol: Loci.Opaline.symbol,  mutants: Loci.Opaline.mutants,  active: 0 });
    } else {
      this.target.genes[1].pop();
      this.target.genes[1].pop();
      this.target.genes[1].pop();
      this.target.genes[1].pop();
    }
  }

  geneClicked(gene) {
    if (this.isRunning) {
      return;
    }

    gene.active++;
    if (gene.active >= gene.mutants.length) {
      gene.active = 0;
    }
  }

  async generateClicked() {
    const initialPopulation = this.parameters.initial;

    this.initialMales = [];
    this.initialFemales = [];

    for (let i = 0; i < initialPopulation; ++i) {
      const individual = generate();

      if (individual.gender === Gender.Male) {
        this.initialMales.push(individual);
      } else {
        this.initialFemales.push(individual);
      }
    }

    this.generation = 0;
    this.fitness = 0;
    this.males = this.initialMales;
    this.females = this.initialFemales;
    this.initialMaleAges = this.initialMales.map(male => male.age);
    this.initialFemaleAges = this.initialFemales.map(female => female.age);
  }

  async runGA() {
    this.isRunning = true;

    const target = getTargetGenome(this.target);
    const maxPopulation = this.parameters.maximum;
    const numPairs = this.parameters.breeders;
    const maxGenerations = this.parameters.generations;

    const evaluate = (a) => {
      a.fitness = evaluateFitness(a.genome, target);
      a.age++;
      return a;
    }

    // let newMales = this.males;
    // let newFemales = this.females;
    let found = false;
    let tracer = null;
    this.generation = 0;
    
    // start from the previously generated population
    this.initialMaleAges.forEach((age, i) => {
      this.initialMales[i].age = age;
    });

    this.initialFemaleAges.forEach((age, i) => {
      this.initialFemales[i].age = age;
    });

    this.males = this.initialMales.map(evaluate).sort(compareIndividuals);
    this.females = this.initialFemales.map(evaluate).sort(compareIndividuals);

    while (!found && this.generation < maxGenerations) {
      let newMales = [];
      let newFemales = [];

      if (this.males.length != 0 && this.females.length != 0) {
        if (this.males[0].fitness <= this.females[0].fitness) {
          this.fitness = this.males[0].fitness;
          this.fittest = [...this.males[0].genome];
          tracer = this.males[0];
        } else {
          this.fitness = this.females[0].fitness;
          const genome = [[], []];
          genome[0] = [...this.females[0].genome[0]];
          genome[1] = [...this.females[0].genome[1]];
          genome[1].pop();
          genome[1].pop();
          genome[1].pop();
          genome[1].pop();
          this.fittest = genome;
          tracer = this.females[0];
        }
      } else if (this.males.length !== 0 || this.females.length !== 0) {
        if (this.males.length === 0) {
          this.fitness = this.females[0].fitness;
          const genome = [[], []];
          genome[0] = [...this.females[0].genome[0]];
          genome[1] = [...this.females[0].genome[1]];
          genome[1].pop();
          genome[1].pop();
          genome[1].pop();
          genome[1].pop();
          this.fittest = genome;
          tracer = this.females[0];
        } else if (this.females.length === 0) {
          this.fitness = this.males[0].fitness;
          this.fittest = [...this.males[0].genome];
          tracer = this.males[0];
        }
        break;
      }

      console.log(`Generation: ${this.generation}, Fitness: ${this.fitness}, population: ${this.males.length + this.females.length}`);

      if (this.fitness == 0) {
        found = true;
        break;
      }

      // Only allow 1 year old individuals to breed (2 breeding cycles)
      // Select the top 50% of the fittest individuals (of max population)
      const fathers = this.males.filter(a => a.age >= 2).slice(0, Math.floor(maxPopulation / 4));
      const mothers = this.females.filter(a => a.age >= 2).slice(0, Math.floor(maxPopulation / 4));;
      this.generation++;

      for (let i = 0; i < numPairs && mothers.length > 0 && fathers.length > 0; ++i) {
        // select individuals at random
        const a = Math.floor(Math.random() * fathers.length);
        const b = Math.floor(Math.random() * mothers.length);

        const mother = mothers[b];
        const father = fathers[a];

        const [sons, daughters] = mate(mother, father, this.generation);

        newMales = newMales.concat(sons);
        newFemales = newFemales.concat(daughters);

        // let the pair rest for the cycle
        fathers.splice(a, 1);
        mothers.splice(b, 1);
      }

      // select survivors
      this.males = cullOldMales(this.males);
      this.females = cullOldFemales(this.females);
      const curMales = newMales.length + this.males.length;
      const curFemales = newFemales.length + this.females.length;
      const [numFemales, numMales] = genderLimit(curFemales, curMales, maxPopulation);
      console.log(`${numFemales}:${numMales}`)
      this.males = this.males.concat(newMales).map(evaluate).sort(compareIndividuals).slice(0, numMales);
      this.females = this.females.concat(newFemales).map(evaluate).sort(compareIndividuals).slice(0, numFemales);
    }

    // this.males = this.initialMales;
    // this.females = this.initialFemales;
    this.isRunning = false;
    drawGraph(this.cytoscapeCanvas, tracer);
  }

  startClicked() {
    this.runGA();
  }
}
