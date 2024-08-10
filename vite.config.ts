import { fileURLToPath, URL } from "node:url";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			"lucide-svelte/icons": fileURLToPath(
				new URL(
					"./node_modules/lucide-svelte/dist/icons",
					import.meta.url,
			),
			),
		},
		extensions: [".ts", ".js", ".svelte", ".mts", ".mjs", ".json"]
	},
});
