import { styled } from '@mui/material/styles';
import { motion } from "framer-motion"
import follow_back_r from '../../images/followMe/follow_back_r.png'
import follow_back_l from '../../images/followMe/follow_back_l.png'

const Tree = styled(motion.div)({
  width: '600px',
  // height: '200px',
  display: 'flex',
  zIndex: 0
})

export function BackFollow(){
  return(
    <div>
      <Tree 
        animate={{ 
          scale: 1, 
          x:-280, 
          position: 'fixed',
          top:'0',
          left:'100%',
          zIndex: 0
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={follow_back_r} style={{width:'290px'}}/>
      </Tree>
      <Tree 
        animate={{ 
          scale: 1, 
          y:-280, 
          position: 'fixed',
          top:'100%',
          left:'0',
          zIndex: 0
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={follow_back_l} style={{width:'400px'}}/>
      </Tree>
    </div>
  )
}