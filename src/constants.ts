interface ContractAddress {
	delegationRegistry: string;
}

export const contractAddresses: Record<number | string, ContractAddress> = {
	// goerli
	5: {
		delegationRegistry: '0x000000009f86cc63056f5b119e113cf68ff52d57'
	},
	'0x5': {
		delegationRegistry: '0x000000009f86cc63056f5b119e113cf68ff52d57'
	},
	// local node
	1337: {
		delegationRegistry: '0x5fbdb2315678afecb367f032d93f642f64180aa3'
	},
	'0x539': {
		delegationRegistry: '0x5fbdb2315678afecb367f032d93f642f64180aa3'
	}
};
