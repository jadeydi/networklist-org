import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Switch, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from '@material-ui/core/styles';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import { tryConnectWallet } from '../../stores/slices/accountSlice'
import { formatAddress, getProvider } from '../../utils'
import classes from './header.module.scss'

const StyledSwitch = withStyles((theme) => ({
  root: {
    width: 58,
    height: 32,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(28px)',
      color: '#212529',
      '& + $track': {
        backgroundColor: '#ffffff',
        opacity: 1,
      },
    },
    '&$focusVisible $thumb': {
      color: '#ffffff',
      border: '6px solid #fff',
    }
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 32 / 2,
    border: `1px solid #212529`,
    backgroundColor: '#212529',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Header = (props) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const [ darkMode, setDarkMode ] = useState(props.theme.palette.type === 'dark' ? true : false);

  const handleToggleChange = (event, val) => {
    setDarkMode(val)
    props.changeTheme(val)
  }

  const onAddressClicked = () => {
    dispatch(tryConnectWallet());
  }

  const renderProviderLogo = () => {
    const providerLogoList = {
      Metamask: 'metamask',
      imToken: 'imtoken',
      Wallet: 'metamask',
    }
    return providerLogoList[getProvider()]
  }

  useEffect(function() {
    const localStorageDarkMode = window.localStorage.getItem('yearn.finance-dark-mode')
    setDarkMode(localStorageDarkMode ? localStorageDarkMode === 'dark' : false)
  },[]);

  return (
    <div className={ classes.headerContainer }>
      <div className={ classes.themeSelectContainer }>
        <StyledSwitch
          icon={ <Brightness2Icon className={ classes.switchIcon }/> }
          checkedIcon={ <WbSunnyOutlinedIcon className={ classes.switchIcon }/> }
          checked={ darkMode }
          onChange={ handleToggleChange }
        />
      </div>
      <Button
        disableElevation
        className={ classes.accountButton }
        variant='contained'
        color='secondary'
        onClick={ onAddressClicked }
      >
        { account && account.address && <div className={ `${classes.accountIcon} ${classes[renderProviderLogo()]}` }></div>}
        <Typography variant='h5'>{ (account && account.address)? formatAddress(account.address) : 'Connect Wallet' }</Typography>
      </Button>
    </div>
  )
}

export default withTheme(Header)
