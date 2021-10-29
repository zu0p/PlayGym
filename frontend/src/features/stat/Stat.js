import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import styles from './Stat.module.css';

export function Stat() {
  // 아마도 profileList를 prop으로 받아오 지 않 을 까? 모르겠네
  const [profiles, setProfiles] = useState({
    n: 3,
    // names: ['qwe', 'asd', 'zxc']
    list: [
      {name: 'qwe', kcal: '500', level: '500'},
      {name: 'asd', kcal: '500', level: '500'},
      {name: 'zxc', kcal: '500', level: '500'},
    ]
  })
  

  return (
    <div className={styles.stat_container}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <div>asdasd</div>
        {profiles.list.map(profile => (
          <Grid item
            direction="row">
              <h5>{profile.name}</h5>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}