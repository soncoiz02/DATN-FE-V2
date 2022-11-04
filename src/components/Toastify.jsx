import React from 'react'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

const CustomToast = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    width: 400px;
  }
  .Toastify__toast {
    box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 10px;
    border-left: 5px solid #42c0eb;
    padding: 10px 30px;
    margin-right: 20px;
  }
  .Toastify__toast-body {
    color: #42c0eb;
    word-break: break-word;
  }
  .Toastify__progress-bar {
    background: linear-gradient(to right, #42c0eb, rgba(0, 0, 0, 0.05));
    border-radius: 50px;
  }

  .Toastify__close-button {
    color: gray;
  }
`

const Toastify = () => {
  return <CustomToast position='top-right' autoClose={2000} pauseOnHover limit={2} />
}

export default Toastify
