import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  Snackbar,
  IconButton,
  Button,
  Typography,
  SvgIcon
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import SuccessIcon from '@material-ui/icons/Done';
import { emitError } from '../../stores/slices/appSlice'
import { colors } from "../../theme/coreTheme";

const iconStyle = {
  fontSize: '22px',
  marginRight: '10px',
  verticalAlign: 'middle'
}

const MySnackbar = (props) => {
  const dispatch = useDispatch();
  const [open] = useState(props.open)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(emitError(''));
  };

  const { message } = props

  let icon = <SuccessIcon color={{...iconStyle, ...{color: colors.blue}}} />;
  let color = colors.blue
  let messageType = ''
  let actions = [
    <IconButton
      key="close"
      aria-label="Close"
      onClick={handleClose}
    >
      <CloseIcon />
    </IconButton>,
  ]

  switch (props.type) {
    case 'Error':
      icon = <ErrorIcon style={{...iconStyle, ...{color: colors.red}}} />
      color = colors.red
      messageType = "Error"
      break;
    case 'Success':
      icon = <SuccessIcon color={{...iconStyle, ...{color: colors.blue}}} />
      color = colors.blue
      messageType = "Success"
      break;
    case 'Warning':
      icon = <WarningIcon color={{...iconStyle, ...{color: colors.orange}}} />
      color = colors.orange
      messageType = "Warning"
      break;
    case 'Info':
      icon = <InfoIcon color={{...iconStyle, ...{color: colors.blue}}} />
      color = colors.blue
      messageType = "Info"
      break;
    case 'Hash':
      icon = <SuccessIcon color={{...iconStyle, ...{color: colors.blue}}} />
      color = colors.blue
      messageType = "Hash"

      let snackbarMessage = 'https://etherscan.io/tx/'+message;
      actions = [<Button variant="text" size="small" onClick={()=> window.open(snackbarMessage, "_blank")}>
        View
      </Button>,
      <IconButton
        key="close"
        aria-label="Close"
        onClick={handleClose}
      >
        <CloseIcon />
      </IconButton>,
      ]
      break;
    default:
      icon = <SuccessIcon color={colors.blue} />
      color = colors.blue
      messageType = "Success"
      break;
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={ open }
      autoHideDuration={12000}
      onClose={handleClose}
      message={
        <div style={{ padding: '12px', borderLeft: '5px solid '+color, borderRadius: '4px'}}>
          {icon}
          <div style={{ display: 'inline-block', verticalAlign: 'middle', maxWidth: '400px' }}>
            <Typography variant='body1' style={{ fontSize: '12px', color: color }}>{ messageType }</Typography>
            <Typography variant='body1' style={{ fontSize: '10px' }}>{ message }</Typography>
          </div>
        </div>
      }
      action={actions}
    />
  );
}

export default MySnackbar;
