import React, {useState} from 'react'
import baseMonkey from '../../../images/games/base_monkey.gif'
export function FollowMe(){

  return(
    <div style={{backgroundColor: '#D5E8A6', height:'100vh'}}>
      <img src={baseMonkey} loop={'infinte'} width={'600px'}/>
    </div>
  )
}