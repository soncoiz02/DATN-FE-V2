import { io } from 'socket.io-client'

const getSocket = () => {
  return io(`https://beauty-paradise-server.vercel.app`)
}

export default getSocket
