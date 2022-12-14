import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

export function useStorage<Value>(
    key: string, 
    initialValue: Value
): Writable<Value> {
    let serialize = JSON.stringify
    let deserialize = JSON.parse

    // get stored value
    let storedValue: Value = deserialize(localStorage.getItem(key))

    // if value exists return it otherwise use initial value
    let store = writable(storedValue ? storedValue : initialValue)
    // subscribe to the store and update local storage when it changes
    store.subscribe(value => localStorage.setItem(key, serialize(value)))
    
    return store
}