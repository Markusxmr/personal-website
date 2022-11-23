// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			scss: {
				prependData: `@import './src/app.scss';`
			},
		}),
		preprocess({
			postcss: true
		})],

	kit: {
		adapter: adapter(),
		alias: {
			$houdini: './$houdini',
			$graphql: './src/graphql',
  			$lib: './src/lib',
  			$stores: './src/stores',
		},
    	files: {
      		hooks: {
				client: 'src/hooks.client',
				server: 'src/hooks.server'
			},
		},
		prerender: {
			enabled: false
		},
	}
};

export default config;
