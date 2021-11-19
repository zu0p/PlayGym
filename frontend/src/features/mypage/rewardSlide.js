import React, { useEffect } from "react";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import styles from './Mypage.module.css'
import styled from '@emotion/styled'
import { style } from "@mui/system";
import rewardBox from '../../images/reward.png'

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default function Slide(props) {

  return (
    <Div>
      {Array.from(props.data).map((reward, idx) => {
        return (
          <div key={idx} className={styles.reward__container}>
            <div style={{ display: 'flex', justifyContent: 'end'}}>
              
            </div>
            <p style={{display: reward.status==='Wait'?'none':'block'}} className={styles.reward__tag}>{reward.title}</p>
            <img style={{display: reward.status==='Wait'?'block':'none'}} src={rewardBox} width={'100px'}/>
          </div>
        )
      })}
    </Div>
  );
}
