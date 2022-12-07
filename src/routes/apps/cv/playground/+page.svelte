<script lang="ts">
	import { clickOutside } from '$lib/core/directives/clickOutsideDirective';
	import { customTransition } from '$lib/core/animations';

	import React from 'react';
	import { onMount } from 'svelte';
	import { createRoot } from 'react-dom/client';
	import Flow from './react/App';

	import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
	import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
	import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
	import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
	import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

	import { StringCodec } from 'nats.ws';
	import { store } from '$stores/core';
	import { getNotificationsContext } from 'svelte-notifications';
	import { initNatsClient } from '$lib/core/clients/nats';

	const { addNotification } = getNotificationsContext();

	let editor: monaco.editor.IStandaloneCodeEditor;
	let Monaco;
	let container: HTMLElement;
	let monacoContainer: HTMLElement;
	let value = '';
	let valueResult = '';
	let editorContext = {
		name: '',
		code: ''
	};

	async function initMonaco() {
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

		Monaco = await import('monaco-editor');
		editor = Monaco.editor.create(monacoContainer, {
			value,
			language: 'typescript'
		});
	}

	async function executeCode(data: string) {
		const nc = window.nc;
		const sc = StringCodec();
		nc.request('playground.execute', sc.encode(JSON.stringify(data))).then((response) => {
			valueResult = JSON.parse(sc.decode(response?.data));
			addNotification({
				text: 'Succesfully executed',
				type: 'success',
				position: 'top-center',
				removeAfter: 5000
			});
		});
	}

	function run() {
		value = editor.getValue();
		executeCode(value);
		clearEditor();
	}

	function clearEditor() {
		editorContext = {
			name: '',
			code: ''
		};
		valueResult = '';
	}

	async function subscribePlaygroundContext() {
		const nc = await initNatsClient();
		const sc = StringCodec();
		const sub = nc.subscribe('playground.context');
		for await (const m of sub) {
			const decoded = sc.decode(m.data);
			editorContext = JSON.parse(decoded);
			value = editorContext?.code;
			valueResult = '';
			editor.getModel().setValue(editorContext?.code);
			// console.log(`[${sub.getProcessed()}]: ${decoded}`);
		}
	}

	async function subscribePlaygroundResult() {
		const nc = await initNatsClient();
		const sc = StringCodec();
		const sub = nc.subscribe('playground.result');
		for await (const m of sub) {
			const decoded = sc.decode(m.data);
			valueResult = JSON.parse(decoded);
			// console.log(`[${sub.getProcessed()}]: ${decoded}`);
		}
	}

	onMount(async () => {
		const container = document.getElementById('playground');
		if (container) {
			const root = createRoot(container);
			root.render(React.createElement(Flow));
		}
		await initMonaco();
		subscribePlaygroundContext();
		subscribePlaygroundResult();

		return () => {
			editor.dispose();
		};
	});
</script>

<div transition:customTransition>
	<h1 class="text-4xl font-bold text-gray-900 dark:text-gray-900 md:text-5xl">Playground</h1>

	<div class="mt-5 mb-5">
		<p>Left side flowchart editor is implemented in React an embeded in Svelte app.</p>

		<p>Right side code editor executes the code and returns a value if a function has a return statement.</p>
	</div>

	<div class="playground-container" class:playground-container-two={!!value} class:playground-container-one={!value}>
		<div id="playground" style="height: 600px" bind:this={container} />

		<div class:editor-visible={!!value} use:clickOutside>
			<div class="form-group">
				<input
					type="text"
					name="name"
					id="name"
					class=" h-10 w-full rounded border border-gray-200 px-2 py-1 text-sm outline-none"
					placeholder="Node name"
					aria-required="true"
					bind:value={editorContext.name}
				/>
			</div>
			<div
				id="container"
				style="
				width: 100%;
				height: 40vh;
				"
				bind:this={monacoContainer}
			/>
			<div class="mx-auto mt-1 text-center">
				<button disabled={!value} on:click={run}>
					<span class:text-gray-500={!value} class:text-green-700={value}>
						Run <i class="fa fa-play" />
					</span>
				</button>
			</div>
			<div
				class="text-center"
				style="
				min-height: 100px;
				width: 100%;
				border: 1px solid #ccc;
				border-radius: 5px;
				padding: 10px;
				"
			>
				{#if valueResult}
					{JSON.stringify(valueResult, null, 2)}
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.editor-visible {
		visibility: visible;
	}

	.editor-hidden {
		visibility: hidden;
	}

	.playground-container {
		display: grid;
	}

	.playground-container-one {
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 10px;
	}

	.playground-container-two {
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 10px;
	}

	@media all and (max-width: 650px) {
		.playground-container {
			grid-template-columns: 1fr;
		}
	}
</style>
