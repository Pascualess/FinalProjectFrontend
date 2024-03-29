import { User } from 'firebase/auth';
import React, { ReactNode, useEffect, useState } from 'react';
import { auth } from '../config/firebase'
import AuthContext from './AuthContext';

function AuthContextProvider({children}: {children:ReactNode}) {
    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        return auth.onAuthStateChanged(newUser => {
            setUser(newUser);
        });
    }, []);

   return(<AuthContext.Provider value={{user}}>
    {children}
   </AuthContext.Provider>)
}

export default AuthContextProvider;