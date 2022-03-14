import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { withTheme, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import path from 'path'
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Paper
} from '@material-ui/core'
import Chain from '../components/chain'
import Header from '../components/header'

import { useDispatch } from 'react-redux';
import { tryConnectWallet } from '../stores/slices/accountSlice'

import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import GithubIcon from '@material-ui/icons/Github';
import useSWR from 'swr'

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

const Home = ({ changeTheme, theme }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(tryConnectWallet());
  }, []) ;

  const { data, error } = useSWR('https://chainid.network/chains.json', fetcher)
  if (data && !data.find(e => e.chainId === 83927)) {
    data.push({
      name: "Quorum Test",
      chain: "QUM",
      chainId: 83927,
      rpc: [
        "https://quorum.mixin.zone/",
      ],
      nativeCurrency: {
        name: "Quorum",
        symbol: "RUM",
        decimals: 18,
      },
      explorers: [
        {
          name: "mvmscan",
          url: "https://testnet.mvmscan.com/",
          standard: "EIP3091"
        }
      ]
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

  const addNetwork = () => {
    window.location.href = 'https://github.com/ethereum-lists/chains'
  }

  const followUs = () => {
    window.location.href = 'https://twitter.com/ChainlistInfo'
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
          <div className={ classes.copyContainer }>
            <div className={ classes.copyCentered }>
              <Typography variant='h1' className={ classes.chainListSpacing }><span className={ classes.helpingUnderline }>Chainlist</span></Typography>
              <Typography variant='h2' className={ classes.helpingParagraph }>Helping users connect to EVM powered networks</Typography>
              <Typography className={classes.subTitle}>Chainlist is a list of EVM networks. Users can use the information to connect their wallets and Web3 middleware providers to the appropriate Chain ID and Network ID to connect to the correct chain.</Typography>
              <Button
                size='large'
                color='primary'
                variant='contained'
                className={ classes.addNetworkButton }
                onClick={ addNetwork }
                endIcon={<AddIcon />}
              >
                <Typography className={ classes.buttonLabel }>Add Your Network</Typography>
              </Button>

              <Button
                size='large'
                color='secondary'
                variant='contained'
                className={ classes.followButton }
                onClick={ followUs }
                endIcon={<AddIcon />}
              >
                <Typography className={ classes.buttonLabel }>Follow @ChainlistInfo</Typography>
              </Button>

              <div className={ classes.socials }>
                <a className={ `${classes.socialButton}` } href='https://github.com/antonnell/networklist-org.git' target='_blank' rel="noopener noreferrer" >
                  <GithubIcon fontSize="small" style={{ color: "#2F80ED" }}/>
                  <Typography variant='body1' className={ classes.sourceCode }>View Source Code</Typography>
                </a>
                <Typography variant='subtitle1' className={ classes.version }>Version 1.0.7</Typography>
              </div>
            </div>
          </div>
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
                data && data.filter((chain) => {
                  if (search === '') {
                    return true
                  } else {
                    //filter
                    return (chain.chain.toLowerCase().includes(search.toLowerCase()) ||
                    chain.chainId.toString().toLowerCase().includes(search.toLowerCase()) ||
                    chain.name.toLowerCase().includes(search.toLowerCase()) ||
                    (chain.nativeCurrency ? chain.nativeCurrency.symbol : '').toLowerCase().includes(search.toLowerCase()))
                  }
                }).map((chain, idx) => {
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
