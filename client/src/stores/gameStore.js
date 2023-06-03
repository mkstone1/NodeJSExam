import { writable } from "svelte/store";


export const isGameStrated = writable(false);

export const someoneJoined = writable(false);

export const playerStore = writable([])