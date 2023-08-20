import Map from '../../components/Map'
import Sidebar from '../../components/Sidebar'
import User from '../../components/User/User'
import { useAuth } from '../../utils/customHooks'
import styles from './AppLayout.module.css'

export default function AppLayout() {
  const { isAuthenticated } = useAuth()
  return (
    <div className={styles.app}>
      {isAuthenticated} && <User />
      <Sidebar />
      <Map />
    </div>
  )
}
