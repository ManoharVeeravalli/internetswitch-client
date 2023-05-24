import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyACZTdan5opjBccXJSiAnisjVwv-yT49Jw",
    authDomain: "internetswitch-d4d02.firebaseapp.com",
    databaseURL: "https://internetswitch-d4d02-default-rtdb.firebaseio.com",
    projectId: "internetswitch-d4d02",
    storageBucket: "internetswitch-d4d02.appspot.com",
    messagingSenderId: "33392182038",
    appId: "1:33392182038:web:4e5b64a8cd8bd31731c637"
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



