import React, { ReactNode, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { auth } from './lib/firebase'
import { AuthContext } from './lib/context'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthWrapper>
      <App />
    </AuthWrapper>
  </React.StrictMode >,
)

function AuthWrapper(props: { children: ReactNode }) {

  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    }, (error) => {
      console.error(error);
    });
    return () => unsubscribe();
  }, []);

  return <>
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {props.children}
    </AuthContext.Provider>
  </>
}
