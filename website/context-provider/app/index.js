import React, { useReducer, useContext } from 'react';

const CounterStateContext = React.createContext();
const CounterDispatchContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADING': {
      const newState = {
        ...state,
        isLoading: !state.isLoading,
      };

      return newState;
    }
    case 'SET_DEVICE_TYPE': {
      const newState = {
        ...state,
        deviceType: action.deviceType,
      };

      return newState;
      return true;
    }

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    deviceType: null,
  });

  return (
    <CounterDispatchContext.Provider value={dispatch}>
      <CounterStateContext.Provider value={state}>
        {children}
      </CounterStateContext.Provider>
    </CounterDispatchContext.Provider>
  );
};

export const useApp = () => useContext(CounterStateContext);
export const useDispatchApp = () => useContext(CounterDispatchContext);
