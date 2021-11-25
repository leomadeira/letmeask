import firebase from "firebase/compat";
import { createContext, ReactNode, useEffect, useState} from "react";
import { auth } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>; //função que nao tem retorno
  }

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType); //Contexto

export function AuthContextProvider(props: AuthContextProviderProps){

    const [user , setUser] = useState<User>()

    useEffect(()=> {
      const unsubscribe = auth.onAuthStateChanged(user =>{
        if(user){
          const { displayName, photoURL, uid} = user
  
          if(!displayName || !photoURL){ //Se o usuario nao tiver nome ou foto
            throw new Error('Missing information from Google account.')
          }
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          })
  
          return () =>{
            unsubscribe();
          }
        }
      })
    }, [])
  
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

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle}}> {/*Tudo o que esta dentro de Provider, vai conseguir enxergar o valor do contexto; Ou seja Home e NewRoom  */}
            {props.children}
        </AuthContext.Provider>
    );
};