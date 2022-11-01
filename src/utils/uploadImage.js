import axios from 'axios'

export const uploadAvatarImage = async (imageFile) => {
  try {
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', 'c40q0ssk')
    const { data } = await axios.post(import.meta.env.VITE_UPLOAD_URL, formData)
    return data.url
  } catch (error) {
    console.log(error)
  }
}
