import React, {useState} from "react"

export const Register = () => {


    const [email, setEmail] = useState("")

    const [password, setPassword] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("")



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Email:", email)
        console.log("Password", password)
        console.log("Confirm password", confirmPassword)
    }


    return (
        <div className="container mt-4">

            <h3 className="text-center">Registrarse</h3>
            <hr />

            <form onSubmit={handleSubmit} className='container mt-3'>

                <div className="form-group mt-2">
                    <label htmlFor="email">Email</label>
                    <input placeholder="ingresa tu email" type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="password">Contraseña</label>
                    <input placeholder="establece tu contraseña" type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="password">Confirmar contraseña</label>
                    <input placeholder="confirma tu contraseña" type="text" className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} value={password} />
                </div>
                <button type='submit' className='btn btn-success float-end mt-2'>Crear cuenta</button>
            </form>

        </div>
    )
}
