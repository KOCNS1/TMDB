import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

interface AuthContextType {
  user: any;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const signin = (newUser: string, callback: VoidFunction) => {
    // return fakeAuthProvider.signin(() => {
    //   setUser(newUser);
    //   callback();
    // });
  };
  const storeToken = (token: string, refresh: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("x-refresh", refresh);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("x-refresh");
  };

  const signout = (callback: VoidFunction) => {
    // return fakeAuthProvider.signout(() => {
    //   setUser(null);
    //   callback();
    // });
  };

  const authenticateUser = async () => {
    const res = await verifyToken();
    console.log(res);
    if (res) {
      setUser(res);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  // Verify token and refresh the token if it is expired
  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("x-refresh");

    if (!token || !refreshToken) return false;

    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:4000/auth/verify",
        headers: {
          authorization: `Bearer ${token}`,
          "x-refresh-token": refreshToken,
        },
      });
      return res.data;
    } catch (error) {
      console.log("you are not logged in");
      removeToken();
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const value = {
    user,
    signin,
    signout,
    isLoggedIn,
    authenticateUser,
    verifyToken,
    storeToken,
    removeToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
