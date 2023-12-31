import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setErr(true);
        };

    }

    return (
        <div className="formContainer">
            <div className="form-wrapper">
                <span className="logo">MiniChat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input onChange={() => {setErr(false)}} type="email" placeholder="email" />
                    <input type="password" placeholder="senha" />
                    <button>Entrar</button>
                    {err && <span>Algo deu errado.</span>}
                </form>
                <p>Não tem uma conta? <Link to="/register">Registre-se</Link></p>
            </div>
        </div>
    )
}

export default Login;