import React, { useContext } from 'react'
import { BsFillCameraVideoFill, BsPersonFillAdd } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { FiMoreHorizontal } from 'react-icons/fi'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../../context/ChatContext'

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className='chat'>
      <div className="chatInfo">
        <IoIosArrowBack className='backIcon' />
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <BsFillCameraVideoFill style={{ cursor: 'pointer' }} />
          <BsPersonFillAdd style={{ cursor: 'pointer' }} />
          <FiMoreHorizontal style={{ cursor: 'pointer' }} />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
