// stores.js

import { writable } from "svelte/store";

// File uploader stores
export const files = writable([]);
export const addToDatabaseButtonClicked = writable(false);

// URL uploader stores
export const url = writable("");
export const buttonClicked = writable(false);
