import IconButton from '@mui/material/IconButton'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import styles from './Logout.module.css'

export default function Logout(){
  const onLogoutClick = () => {
    localStorage.clear()
    window.location.href = '/'
  }
  return(
    <div>
      <IconButton 
        onClick={onLogoutClick} 
        className={styles.logout_btn}
        // style={{
        //   color: '#AC3943',
        //   backgroundColor: 'white',
        //   position: 'fixed',
        //   top: '10px',
        //   left: '10px',
        //   zIndex: '100',
        //   width: '40px',
        //   height: '40px'
        // }}
      >
        <ExitToAppIcon fontSize="large"/>
      </IconButton>
    </div>
  )
}