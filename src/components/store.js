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
    } catch (error) {
      console.error('Error fetching store from main process:', error);
    }
  }

  async addItemToStore(newItem) {
    try {
      // Update store in the main process
      this.store = await ipcRenderer.invoke('addItemToStore', newItem);
    } catch (error) {
      console.error('Error adding item to store:', error);
    }
  }
}

const appStore = new AppStore();

export default appStore;
