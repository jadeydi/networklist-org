import React, { useState, useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import GithubIcon from '@material-ui/icons/Github';
import styles from './sidebar.module.scss'

export default function Sidebar() {
  const addNetwork = () => {
    window.location.href = 'https://github.com/ethereum-lists/chains'
  }

  const followUs = () => {
    window.location.href = 'https://twitter.com/ChainlistInfo'
  }

  return (
    <div className={ styles.copyContainer }>
      <div className={ styles.copyCentered }>
        <Typography variant='h1' className={ styles.chainListSpacing }>Chainlist</Typography>
        <Typography variant='h2' className={ styles.helpingParagraph }>Helping users connect to EVM powered networks</Typography>
        <Typography className={styles.subTitle}>Chainlist is a list of EVM networks. Users can use the information to connect their wallets and Web3 middleware providers to the appropriate Chain ID and Network ID to connect to the correct chain.</Typography>
        <Button
          size='large'
          color='primary'
          variant='contained'
          className={ styles.addNetworkButton }
          onClick={ addNetwork }
          endIcon={<AddIcon />}
        >
          <Typography className={ styles.buttonLabel }>Add Your Network</Typography>
        </Button>

        <Button
          size='large'
          color='secondary'
          variant='contained'
          className={ styles.followButton }
          onClick={ followUs }
          endIcon={<AddIcon />}
        >
          <Typography className={ styles.buttonLabel }>Follow @ChainlistInfo</Typography>
        </Button>

        <div className={ styles.source }>
          <a className={ `${styles.link}` } href='https://github.com/antonnell/networklist-org.git' target='_blank' rel="noopener noreferrer" >
            <GithubIcon fontSize="small" style={{ color: "#2F80ED" }}/>
            <Typography variant='body1' className={ styles.code }>View Source Code</Typography>
          </a>
          <Typography variant='subtitle1' className={ styles.version }>Version 1.0.7</Typography>
        </div>
      </div>
    </div>
  )
}
