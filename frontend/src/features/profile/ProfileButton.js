import IconButton from '@mui/material/IconButton'
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import styles from './Profile.module.css'

export default function ProfileButton(){
  const onGotoProfile = () => {
    window.location = '/profile'
  }
  return(
    <div>
      <IconButton 
        onClick={onGotoProfile} 
        className={styles.profile_btn}
      >
        <SupervisedUserCircleRoundedIcon fontSize="large"/>
      </IconButton>
    </div>
  )
}