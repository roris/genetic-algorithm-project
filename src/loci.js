const DefaultWildType = {
  id: 0,
  mutation: '+',
  name: ''
};

export const Blue = {
  symbol: 'bl',
  locus: 0,
  mutants: [
    {id: 0, mutation: '+',  name: 'Green'},
    {id: 1, mutation: '1',  name: 'Blue1'},
    {id: 2, mutation: '2',  name: 'Blue2'},
    {id: 3, mutation: 'aq', name: 'ParBlue1'},
    {id: 4, mutation: 'tq', name: 'ParBlue2'}
  ]
};

export const DarkFactor = {
  symbol: 'D',
  locus: 1,
  mutants: [
    DefaultWildType,
    {id: 5, mutation: '',  name: 'DarkFactor'}
  ]
};

export const Dilute = {
  symbol: 'dil',
  locus: 2,
  mutants: [
    DefaultWildType,
    {id: 6, mutation: '',   name: 'Dilute'},
    {id: 7, mutation: 'cw', name: 'Clearwing'},
    {id: 8, mutation: 'ac', name: 'Australian Clearwing'},
    {id: 9, mutation: 'gw', name: 'Greywing'}
  ]
};

export const Faded = {
  symbol: 'fd',
  locus: 3,
  mutants: [
    DefaultWildType,
    {id: 10, mutation: '',  name: 'Faded'}
  ]
};

export const BronzeFallow = {
  symbol: 'a',
  locus: 4,
  mutants: [
    DefaultWildType,
    {id: 11, mutation: 'bz', name: 'Bronze Fallow'}
  ]
};

export const PaleFallow = {
  symbol: 'pf',
  locus: 5,
  mutants: [
    DefaultWildType,
    {id: 12, mutation: '', name: 'Pale Fallow'}
  ]
};

export const Grey = {
  symbol: 'G',
  locus: 6,
  mutants: [
    DefaultWildType,
    {id: 13, mutation: '', name: 'Grey'}
  ]
};

export const RecessiveGrey = {
  symbol: 'g',
  locus: 7,
  mutants: [
    DefaultWildType,
    {id: 14, mutation: '', name: 'Recessive Grey'}
  ]
};

export const Violet = {
  symbol: 'V',
  locus: 8,
  mutants: [
    DefaultWildType,
    {id: 15, mutation: '', name: 'Violet'}
  ]
};

export const AustralianPied = {
  symbol: 'Pb',
  locus: 9,
  mutants: [
    DefaultWildType,
    {id: 16, mutation: '', name: 'Australian Pied'}
  ]
};

export const DutchPied = {
  symbol: 'Pi',
  locus: 10,
  mutants: [
    DefaultWildType,
    {id: 17, mutation: '', name: 'Dutch Pied'}
  ]
};

export const DanishPied = {
  symbol: 's',
  locus: 11,
  mutants: [
    DefaultWildType,
    {id: 18, mutation: '', name: 'Danish Pied'}
  ]
};

export const Mottle = {
  symbol: 'mo',
  locus: 12,
  mutants: [
    DefaultWildType,
    {id: 19, mutation: '', name: 'Mottle'}
  ]
};

export const Spangle = {
  symbol: 'Sp',
  locus: 13,
  mutants: [
    DefaultWildType,
    {id: 20, mutation: '', name: 'Spangle'}
  ]
};

export const Brownwing = {
  symbol: 'bw',
  locus: 14,
  mutants: [
    DefaultWildType,
    {id: 21, mutation: '', name: 'Brownwing'}
  ]
};

export const Clearbody = {
  symbol: 'Cl',
  locus: 15,
  mutants: [
    DefaultWildType,
    {id: 22, mutation: '', name: 'Clearbody'}
  ]
};

export const Darkwing = {
  symbol: 'Dwi',
  locus: 16,
  mutants: [
    DefaultWildType,
    {id: 23, mutation: '', name: 'Darkwing'}
  ]
};

export const Saddleback = {
  symbol: 'sa',
  locus: 17,
  mutants: [
    DefaultWildType,
    {id: 24, mutation: '', name: 'Saddleback'}
  ]
};

export const Crest = {
  symbol: 'Cr',
  locus: 18,
  mutants: [
    DefaultWildType,
    {id: 25, mutation: '', name: 'Crest'}
  ]
};

export const Anthracite = {
  symbol: 'Ath',
  locus: 19,
  mutants: [
    DefaultWildType,
    {id: 26, mutation: '', name: 'Anthracite'}
  ]
};

export const Blackface = {
  symbol: 'bf',
  locus: 20,
  mutants: [
    DefaultWildType,
    {id: 27, mutation: '', name: 'Blackface'}
  ]
};

export const Slate = {
  symbol: 'sl',
  locus: 21,
  mutants: [
    DefaultWildType,
    {id: 28, mutation: '', name: 'Slate'}
  ]
};

export const Cinnamon = {
  symbol: 'cin',
  locus: 22,
  mutants: [
    DefaultWildType,
    {id: 29, mutation: '', name: 'Cinnamon'}
  ]
};

export const Ino = {
  symbol: 'ino',
  locus: 23,
  mutants: [
    DefaultWildType,
    {id: 30, mutation: '', name: 'Ino'},
    {id: 31, mutation: 'py', name: 'Pearly'},
    {id: 32, mutation: 'pd', name: 'Pallid'}
  ]
};

export const Opaline = {
  symbol: 'op',
  locus: 24,
  mutants: [
    DefaultWildType,
    {id: 33, mutation: '', name: 'Opaline'}
  ]
};

export const All = [
  Blue,
  DarkFactor,
  Dilute,
  Faded,
  BronzeFallow,
  PaleFallow,
  Grey,
  RecessiveGrey,
  Violet,
  AustralianPied,
  DutchPied,
  DanishPied,
  Mottle,
  Spangle,
  Brownwing,
  Clearbody,
  Darkwing,
  Saddleback,
  Crest,
  Anthracite,
  Blackface,
  Slate,
  Cinnamon,
  Ino,
  Opaline
]