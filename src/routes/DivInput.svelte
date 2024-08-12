<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let lynt: string = '';

	$: characterCount = lynt.length;
	$: isOverLimit = characterCount > 280;

	const dispatch = createEventDispatcher<{
		submit: {};
	}>();

	function handlePaste(event: ClipboardEvent) {
		event.preventDefault();
		const text = event.clipboardData?.getData('text/plain') || '';
		document.execCommand('insertText', false, text);
	}

	function interfere(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (event.shiftKey) {
				dispatch('submit');
			} else {
				document.execCommand('insertText', false, '\n');
			}
		}
	}
</script>

<div class="relative w-full">
	<div
		contenteditable="true"
		role="textbox"
		spellcheck="true"
		tabindex="0"
		bind:innerText={lynt}
		class="overflow-wrap-anywhere w-full outline-none"
		placeholder="What's happening?"
		on:paste={handlePaste}
		on:keydown={interfere}
	/>
	<div
		class="absolute bottom-1 right-1 rounded rounded-3xl bg-secondary/70 px-1 text-sm"
		class:text-red-500={isOverLimit}
		class:hidden={characterCount === 0}
	>
		{characterCount}/280
	</div>
</div>
