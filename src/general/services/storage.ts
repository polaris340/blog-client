module Blog {
  export interface StorageServiceInterface {
    get(key:string, defaultValue = null): any
    set(key:string, value:any): void
    remove(key:string): any
  }

  class StorageService implements StorageServiceInterface {
    constructor() {

    }

    get(key:string, defaultValue = null) {
      var raw = localStorage.getItem(key);
      if (!raw) {
        return JSON.parse(raw);
      } else {
        return defaultValue;
      }
    }

    set(key:string, value:any) {
      if (value === null) {
        this.remove(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }

    remove(key) {
      var value = this.get(key);
      localStorage.removeItem(key);
      return value;
    }
  }

  getModule().service('storage', StorageService);
}
