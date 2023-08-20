import React, { createContext, useReducer } from 'react'
import { AuthContextType } from '../types/FakeAuthContext.type'
import { UserType } from '../types/user.type'
import { FAKE_USER } from '../constants/user'

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthState {
  user: UserType | null
  isAuthenticated: boolean
}

type AuthAction = { type: 'login'; payload: UserType } | { type: 'logout' }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false
}

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true }
    case 'logout':
      return { ...state, user: null, isAuthenticated: false }
    default:
      throw new Error('unknown action')
  }
}

const AuthContext = createContext<AuthContextType | null>(null)

function AuthProvider({ children }: AuthProviderProps) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialState)

  const login = (email: string, password: string) => {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER })
    }
  }

  const logout = () => {
    dispatch({ type: 'logout' })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
