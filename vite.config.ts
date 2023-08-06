import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// build: {
	// 	rollupOptions: {
	// 	  external: ['pdf-parse'], // Add "pdf-parse" here to externalize the library
	// 	},
	//   },
	// build: {
	// 	rollupOptions: {
	// 	  external: ['pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js'],
	// 	},
	//   },
	optimizeDeps: {
		include: ['pdfjs-dist'], // Make sure to include pdfjs-dist in optimizeDeps
	  },
});
