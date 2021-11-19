import { motion } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Before = styled(motion.div)({
  width: '200px',
  height: '200px',
  backgroundColor: 'white',
  // opacity: 0.4,
  position: 'fixed',
  left: '42%',
  top: '30%', 
  zIndex: '100',
  textAlign: 'center',
  justifyContent: 'center',  
  borderRadius: '50%'
})

const countDown = {
  // position: 'fixed',
  // left: '50%',
  // top: '25%',
  color: '#AC3943',
  fontSize: 40,
  fontWeight: 'bold'
}

export function BeforeStart(){
  
  const [progress, setProgress] = useState(0)
  const [count, setCount] = useState(8)
  useEffect(()=>{
    if(count>0){
      const timer = setInterval(function() {
        setCount(prevCnt=>prevCnt-1)
        if(count == 1){
          // console.log('clear')
          clearInterval(timer)
        }
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : 100))        
      }, 500);

      return () => {
        clearInterval(timer);
      };
    }

  }, [count])
  return(
    <div>
      <Before
        id='before_ani'
        animate={{ 
          scale: [1,1,1,0],
          rotate: [0, 0, 0, 0, 0],
        }}
        transition={{ duration: 5 }}
      >
        {/* <h1 style={beforeLabel}>게임준비</h1>  */}
        <CircularProgress 
          variant='determinate'
          value={progress} 
          color='error'
          style={{
            width:'200px', 
            height: '200px',
            position: 'absolute',
            top: '0px',
            left: '0px',
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={countDown}>{parseInt((count+1)/3)==0?'게임시작':parseInt((count+1)/3)}</div>
        </Box>
      </Before>
    </div>
  )
}