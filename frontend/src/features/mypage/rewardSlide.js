import React, { useEffect } from "react";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import styles from './Mypage.module.css'
import styled from '@emotion/styled'
import { style } from "@mui/system";

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
            <p className={styles.reward__tag}>{reward.title}</p>
          </div>
        )
      })}
    </Div>
  );
}
