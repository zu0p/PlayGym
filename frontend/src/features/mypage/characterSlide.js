import React, { useEffect } from "react";
import styles from './Mypage.module.css'
import styled from '@emotion/styled'
import { style } from "@mui/system";
import CheckIcon from '@mui/icons-material/Check';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

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
      {Array.from(props.data).map(character => {
        return (
          <div key={character.id} className={styles.character__container}>
            <img src={character.image} alt="" 
              className={character.owned ? styles.character__img__owned : styles.character__img__not}
            />
            <p className={styles.character__tag}>
              {character.owned && <CheckRoundedIcon style={{fontSize: '40px', color: 'green'}} />}
              {!character.owned && character.name}
            </p>
          </div>
        )
      })}
    </Div>
  );
}
