export const createReducer = (InitialState, fnMap) => { // InitialState is immutable record
  const initialState = new InitialState();

  function revive() {
    return initialState.merge({});
  }

  return (state = initialState, action) => {
    if (!(state instanceof InitialState)) return revive();
    const handle = fnMap[action.type];
    return handle ? handle(state, action) : state;
  };
};
