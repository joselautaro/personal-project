import { createContext, useContext, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";


export const PostsContext = createContext()

export const PostsProvider = ({children}) =>{

    const [posts, setPosts] = useState()


    return (
        <PostsContext.Provider value={{
            posts
        }}>
            {children}
        </PostsContext.Provider>
    )
}