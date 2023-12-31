import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { BsLink45Deg } from 'react-icons/bs'
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );

    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });



    setText("");
    setImg(null);
  };

  return (
    <div className='input'>
      <input
        type="text"
        placeholder='Sua mensagem...'
        value={text}
        onChange={e => setText(e.target.value)} />
      <div className="send">
        <input type="file"
          style={{ display: "none" }}
          id="inputFile"
          onChange={e => setImg(e.target.files[0])}
        />
        <label htmlFor="inputFile">
          <BsLink45Deg
            style={
              {
                display: 'flex',
                fontSize: "24px",
                color: "#fff",
                cursor: 'pointer'
              }
            } />
        </label>
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  )
}

export default Input