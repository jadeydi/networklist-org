const chains = [
  {
    name: "Quorum Test",
    chain: "QUM",
    chainId: 83927,
    rpc: [
      "https://quorum-testnet.mixin.zone/",
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
  },
  {
    name: "Astar Network",
    chain: "ASTR",
    chainId: 592,
    rpc: [
      "https://rpc.astar.network:8545/",
    ],
    nativeCurrency: {
      name: "Astar",
      symbol: "ASTR",
      decimals: 18,
    },
    explorers: [
      {
        name: "subscan",
        url: "https://astar.subscan.io/block",
        standard: "EIP3091"
      }
    ]
  },
];

export default chains;
