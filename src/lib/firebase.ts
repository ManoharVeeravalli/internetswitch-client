import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA1vnarmfbyo0EorN8LwlwRFbtPkFrGA5A",
    authDomain: "internetswitch-2570f.firebaseapp.com",
    databaseURL: "https://internetswitch-2570f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "internetswitch-2570f",
    storageBucket: "internetswitch-2570f.appspot.com",
    messagingSenderId: "120862676752",
    appId: "1:120862676752:web:a8ca9260d335ff9e4f3795"
  };

export const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const database = getDatabase(app);

const errors = new Map();
errors.set('auth/wrong-password', 'Please enter valid email id/password');
errors.set('auth/user-not-found', 'Please sign up to continue');
errors.set('auth/email-already-in-use', 'This email is already registered, Please sign in to continue');
errors.set('PERMISSION_DENIED', 'You are not authorized to do this operation');


export function getErrorMessage(code: string) {
    if(errors.has(code)) {
        return errors.get(code);
    }
    return 'Some error has occured, Please try again later';
}



