import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    // const [email, setEmail] = useState("")

    // const [password, setPassword] = useState("")

    // const [confirmPassword, setConfirmPassword] = useState("")

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log("Email:", email)
    //     console.log("Password", password)
    //     console.log("Confirmar password: ", confirmPassword)
    // }
    const user = {
        login: true
    }

    return(
        <AuthContext.Provider value={{
            user
        }}>
        {children}
        </AuthContext.Provider>
    )

}