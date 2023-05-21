import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD0o2HHGWp6oP_VTgA5DA4liDGAvXzIOYE",
    authDomain: "metrix-3c2e5.firebaseapp.com",
    databaseURL: "https://metrix-3c2e5.firebaseio.com",
    projectId: "metrix-3c2e5",
    storageBucket: "metrix-3c2e5.appspot.com",
    messagingSenderId: "167311742834",
    appId: "1:167311742834:web:56e98e39f72041ddf0afeb",
    measurementId: "G-BZ1V321RFK"
};

console.log('initializing...');

export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const database = getDatabase(app);



