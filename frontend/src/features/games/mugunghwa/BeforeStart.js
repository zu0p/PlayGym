import { motion } from 'framer-motion'
import { styled } from '@mui/material/styles'
import { useEffect } from 'react'

const Before = styled(motion.div)({
  width: '20%',
  height: '80px',
  backgroundColor: 'black',
  opacity: 0.4,
  position: 'fixed',
  left: '40%',
  top: '30%',
  zIndex: '100',
  textAlign: 'center',
  justifyContent: 'center',
})

const beforeLabel = {

  // position: 'fixed',
  // left: '50%',
  // top: '25%',
}

export function BeforeStart(){
  let cnt = 3
  useEffect(()=>{
    const beforeAni = document.getElementById('before_ani')

    let minus = setInterval(function(){
      beforeAni.innerHTML = ''
      const count = document.createElement('h1')
      count.innerText = cnt
      beforeAni.appendChild(count)
      // console.log(cnt)
      if(cnt==0) {
        count.innerText = '게임시작!'
        count.style.color='red'
        clearInterval(minus)
      }
      cnt--
    }, 1000)

  },[])
  return(
    <div>
      <Before
        id='before_ani'
        animate={{ 
          scale: [0,2,1,2,1,2,0],
          // rotate: [0, 0, 270, 0],
          borderRadius: ["50%", "50%", "50%", "50%", "50%", "1%"],
        }}
        transition={{ duration: 5 }}
      >
        <h1 style={beforeLabel}>게임준비</h1>
      </Before>
    </div>
  )
}