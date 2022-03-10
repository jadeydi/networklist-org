import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Paper, Button, Tooltip } from '@material-ui/core'
import { getProvider } from '../../utils'
import { tryConnectWallet } from '../../stores/slices/accountSlice'
import { emitError } from '../../stores/slices/appSlice'
import classes from './chain.module.scss'

export default function Chain({ chain }) {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);

  const toHex = (num) => {
    return '0x'+num.toString(16)
  }

  const addToNetwork = () => {
    if(!(account && account.address)) {
      dispatch(tryConnectWallet());
      return
    }

    const params = {
      chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
      chainName: chain.name,
      nativeCurrency: {
        name: chain.nativeCurrency.name,
        symbol: chain.nativeCurrency.symbol, // 2-6 characters long
        decimals: chain.nativeCurrency.decimals,
      },
      rpcUrls: chain.rpc,
      blockExplorerUrls: [ ((chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url) ? chain.explorers[0].url : chain.infoURL) ]
    }

    // TODO install metamask first
    ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: params.chainId }],
    }).then((result) => {
      console.log('wallet_switchEthereumChain', result);
    }).catch((switchError) => {
      if (switchError.code === 4902) {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [params],
        })
          .then((result) => {
            console.log('addEthereumChain result', result);
          })
          .catch((error) => {
            console.log('addEthereumChain error', error);
            dispatch(emitError(error.message ? error.message : error));
          });
      }
      console.log('switchError', switchError);
    });
  };

  const renderProviderText = () => {
    if(account && account.address) {
      const providerTextList = {
        Metamask: 'Add to Metamask',
        imToken: 'Add to imToken',
        Wallet: 'Add to Wallet'
      }
      return providerTextList[getProvider()]
    } else {
      return 'Connect wallet'
    }

  }

  if(!chain) {
    return <div></div>
  }

  return (
    <Paper elevation={ 1 } className={ classes.chainContainer } key={ chain.chainId }>
      <div className={ classes.chainNameContainer }>
        <img
          src='/statics/chains/unknown-logo.png'
          onError={e => {
            e.target.onerror = null;
            e.target.src = "/statics/chains/unknown-logo.png";
          }}
          width={ 28 }
          height={ 28 }
          className={ classes.avatar }
        />
        <Tooltip title={ chain.name }>
          <Typography variant='h3' className={ classes.name } noWrap>
            <a href={ chain.infoURL } target="_blank" rel="noreferrer">
              { chain.name }
            </a>
          </Typography>
        </Tooltip>
      </div>
      <div className={ classes.chainInfoContainer }>
        <div className={ classes.dataPoint }>
          <Typography variant='subtitle1' color='textSecondary' className={ classes.dataPointHeader} >ChainID</Typography>
          <Typography variant='h5'>{ chain.chainId }</Typography>
        </div>
        <div className={ classes.dataPoint }>
          <Typography variant='subtitle1' color='textSecondary' className={ classes.dataPointHeader}>Currency</Typography>
          <Typography variant='h5'>{ chain.nativeCurrency ? chain.nativeCurrency.symbol : 'none' }</Typography>
        </div>
      </div>
      <div className={ classes.addButton }>
        <Button
          variant='outlined'
          color='primary'
          onClick={ addToNetwork }
        >
          { renderProviderText() }
        </Button>
      </div>
    </Paper>
  )
}
