import React, { Component, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from './snackbar.jsx'

const styles = theme => ({
  root: {},
});

const SnackbarController = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    snackbarType: null,
    snackbarMessage: null
  });

  const app = useSelector((state) => state.app);

  useEffect(() => {
    if (app && app.error) {
      const snackbarObj = { snackbarMessage: app.error.toString(), snackbarType: 'Error', open: true };
      setSnackbar(snackbarObj);
    }
  }, [app]);

  if (snackbar.open) {
    return <Snackbar type={ snackbar.snackbarType } message={ snackbar.snackbarMessage } open={ true } />;
  }
  return <div></div>;
};

export default withStyles(styles)(SnackbarController);
