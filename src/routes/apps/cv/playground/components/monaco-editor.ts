import MonacoEditor from './monaco-editor.svelte'
import type { SvelteComponent } from 'svelte'

customElements.define('monaco-editor',
    class extends HTMLElement {
        _monacoElement: SvelteComponent;

        constructor() {
            super()

            // Create the shadow root.
            const shadowRoot = this.attachShadow({ mode: 'open' })

            // Instantiate the Svelte Component
            this._monacoElement = new MonacoEditor({
                // Tell it that it lives in the shadow root
                target: shadowRoot,
                // Pass any props
                props: {
                    // This is the place where you do any conversion between
                    // the native string attributes and the types you expect
                    // in your svelte components
                    items: this.getAttribute('items')?.split(','),
                },
            })
            // shadowRoot.appendChild(this._monacoElement.cloneNode(true));
        }

        disconnectedCallback(): void {
            // Destroy the Svelte component when this web component gets
            // disconnected. If this web component is expected to be moved
            // in the DOM, then you need to use `connectedCallback()` and
            // set it up again if necessary.
            this._monacoElement?.$destroy();
        }
    }
)