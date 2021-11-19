import React, { useEffect } from "react";
import styles from './Mypage.module.css'
import styled from '@emotion/styled'
import { style } from "@mui/system";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { requestChangeCharacter } from '../../app/actions/userActions'
import { useDispatch } from "react-redux";

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default function Slide(props) {
  const dispatch = useDispatch()
  const nameList = {
    rabbit: '토끼',
    bear: '곰',
    chick: '병아리',
    cat: '고양이',
  }

  const onClickCharacter = character => {
    const body = {
      sid: localStorage.getItem('sub-user'),
      cid: character.id
    }
    dispatch(requestChangeCharacter(body))
      .then(() => props.update())
      .catch(() => {})
  }
  
  return (
    <Div>
      {Array.from(props.data).map(character => {
        return (
          <div 
            key={character.id} 
            className={styles.character__container}
          >
            <img src={character.image} alt="" 
              className={character.owned ? styles.character__img__owned : styles.character__img__not}
              onClick={() => {
                if (character.name === props.current)
                  return
                onClickCharacter(character)
              }}
            />
            <p className={styles.character__tag}>
              {character.owned && 
              <CheckRoundedIcon 
                style={character.name === props.current ? 
                  {fontSize: '40px', color: 'green', borderBottom: '5px solid #A3C653', borderRadius: '2px'} : 
                  {fontSize: '40px', color: 'grey'}} 
              />}
              {!character.owned && nameList[character.name]}
            </p>
          </div>
        )
      })}
    </Div>
  );
}
