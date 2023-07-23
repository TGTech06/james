// stores.js

import { writable } from "svelte/store";

// File uploader stores
export const files = writable([]);

// URL uploader stores
export const url = writable("");
