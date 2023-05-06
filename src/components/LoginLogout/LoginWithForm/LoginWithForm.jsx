import { useState } from "react";

export const LoginWithForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validar los campos del formulario aquí
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="container">
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className={`form-control ${formErrors.email && "is-invalid"}`}
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() =>
                            setFormErrors((prevState) => ({
                                ...prevState,
                                email: formData.email ? "" : "El email es requerido",
                            }))
                        }
                    />
                    {formErrors.email && (
                        <div className="invalid-feedback">{formErrors.email}</div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        className={`form-control ${formErrors.password && "is-invalid"}`}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={() =>
                            setFormErrors((prevState) => ({
                                ...prevState,
                                password: formData.password ? "" : "La contraseña es requerida",
                            }))
                        }
                    />
                    {formErrors.password && (
                        <div className="invalid-feedback">{formErrors.password}</div>
                    )}
                </div>
            
            <button type="submit" className="btn btn-primary w-100">
                Ingresar
            </button>
            </div>
        </form>
    );
}

