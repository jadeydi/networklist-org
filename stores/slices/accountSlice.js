import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';

export const tryConnectWallet = createAsyncThunk(
  'account/tryConnectWallet',
  async () => {
    if (window.ethereum) {
      window.web3 = new Web3(ethereum);
      try {
        await ethereum.enable();
        var accounts= await web3.eth.getAccounts();
        if (accounts.length > 0) {
          return accounts[0];
        }
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider);
      var accounts= await web3.eth.getAccounts();
      if (accounts.length > 0) {
        return accounts[0];
      }
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return '';
    }
    return '';
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    address: '',
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tryConnectWallet.pending, (state) => {
        console.log('tryConnectWallet.pending')
      })
      .addCase(tryConnectWallet.fulfilled, (state, action) => {
        state.address = action.payload;
      })
      .addCase(tryConnectWallet.rejected, (state, { error }) => {
        console.log('tryConnectWallet.rejected', error);
      });
  },
});

export const { setAddress } = accountSlice.actions;

export default accountSlice.reducer;
