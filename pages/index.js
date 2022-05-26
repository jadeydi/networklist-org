import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { withTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  InputAdornment,
  Paper
} from '@material-ui/core'
import Chain from '../components/chain'
import Header from '../components/header'
import Sidebar from '../components/sidebar'

import { useDispatch } from 'react-redux';
import { tryConnectWallet } from '../stores/slices/accountSlice'

import SearchIcon from '@material-ui/icons/Search';
import useSWR from 'swr';

import customChains from '../utils/chains';

import styles from '../styles/Home.module.scss'
import classes from './index.module.scss'

const searchTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2F80ED',
    },
  },
  shape: {
    borderRadius: '10px'
  },
  typography: {
    fontFamily: [
      'Inter',
      'Arial',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '12px'
    }
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        "box-shadow": '0px 7px 7px #0000000A;',
        "-webkit-box-shadow": '0px 7px 7px #0000000A;',
        "-moz-box-shadow": '0px 7px 7px #0000000A;',
      }
    },
    MuiInputBase: {
      input: {
        fontSize: '14px'
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: '12.5px 14px'
      },
      notchedOutline: {
        borderColor: "#FFF",
      }
    },
  },
});

const fetcher = (...args) => fetch(...args).then(res => res.json())

const chainsFilter = (chains, search) => {
  search = search.trim().toLowerCase();
  if (search.startsWith('=')) {
    search = search.replaceAll('=', '').trim();
    return chains.filter((chain) => {
      return chain.chainId.toString() === search ||
        chain.chain.toLowerCase() === search ||
        chain.name.toLowerCase() === search ||
        (chain.nativeCurrency ? chain.nativeCurrency.symbol : '').toLowerCase() === search;
    });
  };

  return chains.filter((chain) => {
    if (search === '') {
      return true
    } else {
      //filter
      return (chain.chain.toLowerCase().includes(search) ||
        chain.chainId.toString().toLowerCase().includes(search) ||
        chain.name.toLowerCase().includes(search) ||
        (chain.nativeCurrency ? chain.nativeCurrency.symbol : '').toLowerCase().includes(search))
    }
  });
}

const Home = ({ changeTheme, theme }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryConnectWallet());
  }, []) ;

  const { data, error } = useSWR('https://chainid.network/chains.json', fetcher);
  if (data) {
    customChains.forEach((chain) => {
      if (!data.find(e => e.chainId === chain.chainId)) {
        data.push(chain);
      }
    });
  }

  const [ search, setSearch ] = useState('')
  const router = useRouter()
  if (router.query.search) {
    setSearch(router.query.search)
    delete router.query.search
  }

  const onSearchChanged = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Helping users connect to EVM powered networks - Chainlist.info</title>
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="Helping users connect to EVM powered networks." />
      </Head>

      <main className={styles.main}>
        <div className={ theme.palette.type === 'dark' ? classes.containerDark : classes.container }>
          <Sidebar />
          <div className={ theme.palette.type === 'dark' ? classes.listContainerDark : classes.listContainer }>
            <div className={ theme.palette.type === 'dark' ? classes.headerContainerDark : classes.headerContainer }>
              <div className={ classes.filterRow }>
                <ThemeProvider theme={searchTheme}>
                  <Paper className={ classes.searchPaper }>
                    <TextField
                      fullWidth
                      className={ classes.searchContainer }
                      variant="outlined"
                      placeholder="ETH, BSC, ..."
                      value={ search }
                      onChange={ onSearchChanged }
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                          <SearchIcon fontSize="small"  />
                        </InputAdornment>,
                        startAdornment: <InputAdornment position="start">
                          <Typography className={ classes.searchInputAdnornment }>
                            Search Networks
                          </Typography>
                        </InputAdornment>
                      }}
                    />
                  </Paper>
                </ThemeProvider>
              </div>
              <Header changeTheme={ changeTheme } />
            </div>
            <div className={ classes.cardsContainer }>
              {
                data && chainsFilter(data, search).map((chain, idx) => {
                  return <Chain chain={ chain } key={ idx } />
                })
              }
            </div>
          </div>
        </div>
      </main>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-52707771-16"
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-52707771-16');
            `,
        }}
      />
    </div>
  )
}

export default withTheme(Home)
