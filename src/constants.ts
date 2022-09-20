interface ContractAddress {
	delegationRegistry: string;
}

export const contractAddresses: Record<number | string, ContractAddress> = {
	// eth main chain
	1: {
		delegationRegistry: '0x00000000b1BBFe1BF5C5934c4bb9c30FEF15E57A'
	},
	'0x1': {
		delegationRegistry: '0x00000000b1BBFe1BF5C5934c4bb9c30FEF15E57A'
	},
	// polygon
	137: {
		delegationRegistry: '0x00000000b1BBFe1BF5C5934c4bb9c30FEF15E57A'
	},
	'0x89': {
		delegationRegistry: '0x00000000b1BBFe1BF5C5934c4bb9c30FEF15E57A'
	},
	// goerli
	5: {
		delegationRegistry: '0x00000000b1BBFe1BF5C5934c4bb9c30FEF15E57A'
	},
	'0x5': {
		delegationRegistry: '0x00000000b1BBFe1BF5C5934c4bb9c30FEF15E57A'
	},
	// local node
	1337: {
		delegationRegistry: '0x5fbdb2315678afecb367f032d93f642f64180aa3'
	},
	'0x539': {
		delegationRegistry: '0x5fbdb2315678afecb367f032d93f642f64180aa3'
	}
};

export const nftExplorerURL: Record<number | string, string> = {
	1: 'https://www.nftscan.com',
	'0x1': 'https://www.nftscan.com',
	137: 'https://polygon.nftscan.com',
	'0x89': 'https://polygon.nftscan.com'
};
