import { io } from 'socket.io-client'

const getSocket = () => {
  return io(`http://localhost:8000`)
}

export default getSocket
