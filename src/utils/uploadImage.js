import axios from 'axios'

export const uploadImage = async (image) => {
  const formData = new FormData()
  formData.append('file', image)
  formData.append('upload_preset', 'zcflxmoj')

  const { data } = await axios.post(
    'https://api.cloudinary.com/v1_1/dlqh8iyuw/image/upload',
    formData,
  )
  return data.url
}
