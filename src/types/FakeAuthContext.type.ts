import { UserType } from './user.type'

export interface AuthContextType {
  user: UserType | null
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
}
