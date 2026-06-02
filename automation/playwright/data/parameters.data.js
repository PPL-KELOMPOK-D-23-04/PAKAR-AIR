/**
 * PAKAR-AIR — Analysis Parameter Test Data
 * Values based on EP and BVA tables.
 */

const VALID_PARAMS = {
  ph: 7.0,
  hardness: 204.89,
  solids: 20791.31,
  chloramines: 7.30,
  sulfate: 368.51,
  conductivity: 564.31,
  organic_carbon: 10.37,
  trihalomethanes: 86.99,
  turbidity: 2.96,
};

const BOUNDARY_PARAMS = {
  pH: {
    belowMin: -1,
    justBelowMin: -0.01,
    min: 0,
    justAboveMin: 0.01,
    nominal: 7.0,
    justBelowMax: 13.99,
    max: 14,
    justAboveMax: 14.01,
    aboveMax: 15,
  },
  hardness: { min: 0, nominal: 204.89, max: 500, aboveMax: 600, belowMin: -10 },
  solids: { min: 0, nominal: 20791.31, max: 50000, aboveMax: 60000, belowMin: -100 },
  chloramines: { min: 0, nominal: 7.30, max: 15, aboveMax: 20, belowMin: -5 },
  sulfate: { min: 0, nominal: 368.51, max: 500, aboveMax: 600, belowMin: -50 },
  conductivity: { min: 0, nominal: 564.31, max: 1000, aboveMax: 1500, belowMin: -20 },
  organic_carbon: { min: 0, nominal: 10.37, max: 30, aboveMax: 40, belowMin: -10 },
  trihalomethanes: { min: 0, nominal: 86.99, max: 120, aboveMax: 150, belowMin: -30 },
  turbidity: { min: 0, nominal: 2.96, max: 10, aboveMax: 15, belowMin: -5 },
};

const INVALID_PARAMS = {
  negative: { ph: -1, hardness: -10, solids: -100, chloramines: -5, sulfate: -50, conductivity: -20, organic_carbon: -10, trihalomethanes: -30, turbidity: -5 },
  nonNumeric: { ph: 'abc', hardness: 'xyz', solids: '!@#', chloramines: 'NaN', sulfate: '---', conductivity: 'abc', organic_carbon: 'test', trihalomethanes: 'null', turbidity: 'abc' },
  empty: { ph: '', hardness: '', solids: '', chloramines: '', sulfate: '', conductivity: '', organic_carbon: '', trihalomethanes: '', turbidity: '' },
};

module.exports = {
  VALID_PARAMS,
  BOUNDARY_PARAMS,
  INVALID_PARAMS,
};
