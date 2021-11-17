import { styled } from '@mui/material/styles';
import { motion } from "framer-motion"
import mug_back_r from '../../images/mugunghwa/mug_back_r.png'
import mug_back_l from '../../images/mugunghwa/mug_back_l.png'

const Mug = styled(motion.div)({
  width: '600px',
  // height: '200px',
  display: 'flex',
  zIndex: 0
})

export function BackMug(){
  return(
    <div>
      <Mug 
        animate={{ 
          scale: 1, 
          y:-180, 
          position: 'fixed',
          top:'100%',
          left:'70%',
          zIndex: 0
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={mug_back_r} style={{width:'600px'}}/>
      </Mug>

      <Mug 
        animate={{ 
          scale: 1, 
          y:-930, 
          position: 'fixed',
          top:'100%',
          left: '-50px',
          zIndex: 0
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={mug_back_l} style={{width:'1200px'}}/>
      </Mug>
    </div>
  )
}