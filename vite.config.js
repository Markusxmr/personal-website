
import watchAndRun from '@kitql/vite-plugin-watch-and-run';
import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import path from 'path';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
 
const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

export default {
    define: {
      '__APP_VERSION__': JSON.stringify(pkg.version),
    },
	plugins: [
		houdini(),
		sveltekit(),
		watchAndRun([
			{
				name: 'Houdini',
				watch: path.resolve('src/**/*.(gql|graphql|svelte)'),
				run: 'npm run gen',
				delay: 100,
				watchKind: ['ready', 'add', 'change', 'unlink'],
			},
			{
				name: 'Houdini',
				watch: path.resolve('houdini.config.js'),
				run: 'npm run gen',
				delay: 100,
			}
		])
	],
	resolve: {
		alias: {
			// these are the aliases and paths to them
			'~': path.resolve('./src'),
			$houdini: path.resolve('.', '$houdini')
		}
	},
	optimizeDeps: {
		// Vite does not work well with optional dependencies,
		// mark them as ignored for now
		exclude: [
			'asyncawait',
			'bluebird',
			'body-parser',
			'compression',
			'express',
			'mongoose',
			'node-uuid',
			'request',
			'superagent',
			'underscore',
		],
	},
    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined,
  				treeshake: true
            }
        }
    }
}