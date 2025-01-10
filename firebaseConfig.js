import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyA__s7cnpI9Ul_SNg5sJYkzTwnh6MthFCg',
  authDomain: 'sigapp-447318.firebaseapp.com',
  databaseURL: 'https://sigapp-447318-default-rtdb.firebaseio.com',
  projectId: 'sigapp-447318',
  storageBucket: 'sigapp-447318.appspot.com',
  messagingSenderId: '81643989887',
  appId: '1:81643989887:web:your_app_id_here', // Remplacez `your_app_id_here` par votre app ID exact
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
