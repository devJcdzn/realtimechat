import { useState } from 'react';
import addImage from '../../assets/profile.png';
// Firebase Database
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL
            });

            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          });
        }
      );


    } catch (err) {
      setErr(true);
    };

  }

  return (
    <div className="formContainer">
      <div className="form-wrapper">
        <span className="logo">MiniChat</span>
        <span className="title">Registro</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Seu nome" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="senha" />
          <input type="file" id="file" style={{ display: "none" }} />
          <label htmlFor="file">
            <img src={addImage} alt="" className='labelProfile' />
            <span className='spanProfile'>Adcione sua foto de perfil</span>
          </label>
          <button>Registrar</button>
          {err && <span>Algo deu errrado.</span>}
        </form>
        <p>Já tem uma conta? <Link to="/login">Faça login</Link></p>
      </div>
    </div>
  )
}

export default Register;