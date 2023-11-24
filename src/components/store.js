// store.js

const { ipcRenderer } = window.require('electron');

class AppStore {
    constructor() {
        this.store = null; // Your store data goes here
        this.fetchStore();
    }

    async fetchStore() {
        try {
        // Fetch store from the main process
        this.store = await ipcRenderer.invoke('getStore');
        console.log('store:',this.store)
        } catch (error) {
        console.error('Error fetching store from main process:', error);
        }
    }

    async fetchItem(key) {
        try {
            // Fetch item from the main process
            const item = await ipcRenderer.invoke('getItem', key);
            console.log(`${key}:`, item);  // Log the fetched item
            return item;  // Return the fetched item
        } catch (error) {
            console.error('Error fetching item from main process:', error);
        }
    }
    // async addItemToStore(newItem) {
    //     try {
    //         // Update store in the main process
    //         for (const key of Object.keys(newItem)) {
    //             store.set(key, newItem[key]);
    //             console.log(`${key}:`, store.get(key));  // Log the added item
    //         }
    //         console.log('store:', store.store);
    //         return store.store;
    //     } catch (error) {
    //         console.error('Error adding item to store:', error);
    //     }
    // }

    async addItemToStore(newItem) {
        try {
        // Update store in the main process
        const updatedStore = await ipcRenderer.invoke('addItemToStore', newItem);
        console.log('Updated store:', updatedStore);
        this.store = updatedStore;
        return updatedStore;
        // store.set(Object.keys(newItem), newItem[Object.keys(newItem)]);
        } catch (error) {
        console.error('Error adding item to store:', error);
        }
    }
}

const appStore = new AppStore();

export default appStore;
