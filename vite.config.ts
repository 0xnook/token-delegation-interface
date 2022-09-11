import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit(), svg({ includePaths: ['./static/icons'] })],
	ssr: {
		noExternal: ['devalue']
	},
 commonjsOptions: {
		transformMixedEsModules: true,
	},
	 optimizeDeps: {
    include: ['*/@portis/**'],
  },
};

export default config;
