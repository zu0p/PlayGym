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
  
  useEffect(() => {
    console.log(props.data)
  }, [props])


  return (
    <Div>
      {Array.from(props.data).map(character => {
        return (
          <div key={character.id} className={styles.character__container}>
          {/* <img src={character.image} alt="" style={{width: '25%', objectFit: 'contain'}} /> */}
            <img src={character.image} alt="" className={styles.character__img} />
            <p className={styles.character__tag}>grid_template 쓰고. object fit 이건 부모에 높낮이를 줘야 되려나</p>
          </div>
        )
      })}
    </Div>
  );
}
