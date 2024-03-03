import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { API_ROOT } from 'src/utils/constants';
import { jwtDecode } from 'jwt-decode';
import { getUserInfo, setUserInfo } from 'src/utils/utils';
import { isValidToken, setSession } from 'src/utils/jwt';

interface CustomJwtPayload {
  Id: string;
  Name: string;
  Role: string;
  Status: string;
  iat: number; // Thời gian phát hành token
  exp: number; // Thời gian hết hạn token
}

// Sau đó, sử dụng CustomJwtPayload khi giải mã token

// Define action types
enum Types {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  INITIALIZE = 'INITIALIZE', // Added for clarity
}

// Define state type
interface State {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any; // Modify with actual user type
  role: string | null; // Modify with actual role type
}

// Define action type
type Action =
  | { type: Types.LOGIN | Types.INITIALIZE; payload: { user: any } }
  | { type: Types.LOGOUT };

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  role: null,
};

const JWTReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case Types.INITIALIZE:
    case Types.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        isInitialized: true,
        user: action.payload.user,
        role: action.payload.user?.Role,
      };
    case Types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<{ [key: string]: any } | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const token = window.localStorage.getItem('token');
        const userRaw = getUserInfo();
        if (token && isValidToken(token) && userRaw) {
          setSession(token);

          const user = JSON.parse(userRaw);

          dispatch({
            type: Types.INITIALIZE,
            payload: {
              user,
            },
          });
        } else {
          dispatch({
            type: Types.INITIALIZE,
            payload: {
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.INITIALIZE,
          payload: {
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (phone: string, password: string) => {
    try {
      const response = await axios.post(`${API_ROOT}/api/v1/login/driver`, {
        phone,
        password,
      });
      const { token } = response.data;
      const decodedToken = jwtDecode<CustomJwtPayload>(token);

      const user = {
        id: decodedToken.Id,
        name: decodedToken.Name,
        role: decodedToken.Role,
        status: decodedToken.Status,
        iat: decodedToken.iat,
        exp: decodedToken.exp,
      };
      setSession(token);
      setUserInfo(user);
      router.push('/demo/trip/trip-list/');
      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });
    } catch (err) {
      console.error(err);
      const error = err as { response: { data: { message: string } } };
      throw new Error(error.response.data.message || 'Đăng nhập thất bại.');
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: Types.LOGOUT });
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
