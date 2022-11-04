import { io } from 'socket.io-client'

const getSocket = (namespace) => {
  return io(`http://localhost:8000/${namespace}`)
}

export default getSocket
