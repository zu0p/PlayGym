import React, { useEffect, useState } from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Profile.module.css'
import Grid from '@mui/material/Grid'
import { motion } from 'framer-motion'

export function Profile(){
  return(
    <div className={styles.profile_container}>
      <Grid 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <label>Select Player</label>
        </Grid>
      </Grid>
    </div>
  )
}