import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
  // Context is created
  const Context = React.createContext();

  // Provider is created
  const Provider = ({ children }) => {
    // Fancier useState where reducer is custom reducer and defaultValue is our initialValue
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};

    // We link the received actions and the dispatch fn
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);

    }
    return (
      <Context.Provider value={{ state, ...boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};