import React, { useEffect } from "react";
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
      {Array.from(props.data).map(reward => {
        return (
          <div key={reward.id} className={styles.reward__container}>
            <p className={styles.reward__tag}>{reward}</p>
          </div>
        )
      })}
    </Div>
  );
}
