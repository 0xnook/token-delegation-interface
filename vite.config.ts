import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), svg({ includePaths: ['./src/assets'] })],
	ssr: {
		noExternal: ['devalue']
	}
};

export default config;
