import { useEffect, useReducer } from "react";
import { getMeFn } from "../../api/auth";
import { initialState, stateReducer } from "./auth.context";

function useMountAuth() {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  useEffect(() => {
    getMeFn()
      .then((data) => {
        if (data) {
          dispatch({ type: "SET_USER", payload: { authUser: data } });
        }
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT", payload: { authUser: null } });
      });
  }, []);

  return { state, dispatch } as const;
}

export default useMountAuth;
