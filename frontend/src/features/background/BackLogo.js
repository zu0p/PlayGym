
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion"
import logo from '../../images/row_logo_plus.png'

const Logo = styled(motion.div)({
  width: '500px',
  display: 'flex',
  zIndex: 0
})

export function BackLogo(){
  return(
    <div>
      <Logo 
        animate={{ 
          scale: 1, 
          y:100, 
          position: 'fixed',
          top:'-150px',
          left:'35%',
          zIndex: 0
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={logo} style={{width:'500px'}}/>
      </Logo>
    </div>
  )
}