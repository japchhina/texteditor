import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
console.log('PUT to database');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readwrite');
const store = tx.objectStore('jate');
store.put(content);
await tx.done;
}

export const getDb = async () => {
console.log('GET from database');
const jateDb = await openDB('jate', 1);
const tx = jateDb.transaction('jate', 'readonly');
const store = tx.objectStore('jate');
const result = await store.getAll();
await tx.done;
return result;
}

export default initdb;

