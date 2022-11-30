import React, { createContext, useContext, useReducer } from "react";
import { getMeFn } from "../../api/auth";
import { IUser } from "../../api/types";

type State = {
  authUser: IUser | null;
  loggedIn: boolean;
  tmdbToken: boolean | null;
};

type Action = {
  type: string;
  payload: {
    authUser: IUser | null;
    loggedIn?: boolean;
    tmdbToken?: boolean;
  };
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  authUser: null,
  loggedIn: false,
  tmdbToken: false,
};

getMeFn()
  .then((data) => {
    if (data) {
      initialState.authUser = data;
      initialState.loggedIn = true;
    }
  })
  .catch((err) => {
    initialState.authUser = null;
    initialState.loggedIn = false;
  });

type StateContextProviderProps = { children: React.ReactNode };

const StateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        authUser: action.payload.authUser,
        loggedIn: action.payload ? true : false,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        authUser: null,
        loggedIn: false,
      };
    }
    case "SET_TMDB_TOKEN": {
      return {
        ...state,
        tmdbToken: Boolean(action.payload.tmdbToken),
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};

const useStateContext = () => {
  const context = useContext(StateContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { StateContextProvider, useStateContext };
