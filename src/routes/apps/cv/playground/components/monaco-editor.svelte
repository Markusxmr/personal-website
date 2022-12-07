<script lang="ts">
	import { onMount } from 'svelte';

	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	let monacoContainer: HTMLDivElement = null;
	let editor;
	let Monaco;

	let container;
	let code = '';

	onMount(() => {
		// @ts-ignore
		self.MonacoEnvironment = {
			getWorker: function (_moduleId: any, label: string) {
				if (label === 'json') {
					return new jsonWorker();
				}
				if (label === 'css' || label === 'scss' || label === 'less') {
					return new cssWorker();
				}
				if (label === 'html' || label === 'handlebars' || label === 'razor') {
					return new htmlWorker();
				}
				if (label === 'typescript' || label === 'javascript') {
					return new tsWorker();
				}
				return new editorWorker();
			}
		};

		import('monaco-editor').then((Monaco) => {
			editor = Monaco.editor.create(monacoContainer, {
				value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
				language: 'typescript'
			});
		});

		return () => {
			editor.dispose();
		};
	});
</script>

<div style="width: 100%; height: 50vh; border: 1px solid grey" bind:this={monacoContainer} />
