
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion"
import charactor from '../../images/back_char.png'

const Charactor = styled(motion.div)({
  width: '600px',
  // height: '200px',
  display: 'flex',
  zIndex: 0
})

export function BackChar(){
  return(
    <div>
      <Charactor 
        animate={{ 
          scale: 1, 
          y:-200, 
          position: 'fixed',
          top:'100%',
          left:'60%',
          zIndex: 0
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={charactor} style={{width:'600px'}}/>
      </Charactor>
    </div>
  )
}