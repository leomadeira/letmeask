import { BrowserRouter, Routes, Route } from "react-router-dom";

import { NewRoom } from "./pages/NewRoom";
import { Home } from "./pages/Home";

import { createContext, useState } from 'react' //Contexto
import firebase from "firebase/compat";
import { auth } from "./services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>; //função que nao tem retorno
}

export const AuthContext = createContext({} as AuthContextType); //Contexto

export function App() {

  const [user , setUser] = useState<User>()

  async function signInWithGoogle(){

    const provider = new firebase.auth.GoogleAuthProvider(); //Entrar na conta do google no projeto letmeask

    const result = await auth.signInWithPopup(provider)
    
      if(result.user){
        const { displayName, photoURL, uid} = result.user

        if(!displayName || !photoURL){ //Se o usuario nao tiver nome ou foto
          throw new Error('Missing information from Google account.')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }

  return (
      <BrowserRouter>
        <Routes>
          <AuthContext.Provider value={{ user, signInWithGoogle}}> {/*Tudo o que esta dentro de Provider, vai conseguir enxergar o valor do contexto; Ou seja Home e NewRoom  */}
          <Route path="/" element={<Home />} /> {/* Antigamente era component={Home} */}
          <Route path='/rooms' element={<NewRoom />} />
          </AuthContext.Provider>
        </Routes>
      </BrowserRouter>
  );  
}

