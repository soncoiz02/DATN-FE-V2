import {
  Avatar,
  Backdrop,
  Box,
  Container,
  IconButton,
  Modal,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import React from 'react'
import GlassBox from './GlassBox'
import Emoji1 from '../assets/img/emoji/emoji-1.gif'
import Emoji2 from '../assets/img/emoji/emoji-2.gif'
import Emoji3 from '../assets/img/emoji/emoji-3.gif'
import Emoji4 from '../assets/img/emoji/emoji-4.gif'
import Emoji5 from '../assets/img/emoji/emoji-5.gif'
import { useState } from 'react'
import MainButton from './MainButton'
import { Close, Send } from '@mui/icons-material'

const ratedValues = [
  {
    key: 1,
    value: 1,
    emoji: Emoji1,
  },
  {
    key: 2,
    value: 2,
    emoji: Emoji2,
  },
  {
    key: 3,
    value: 3,
    emoji: Emoji3,
  },
  {
    key: 4,
    value: 4,
    emoji: Emoji4,
  },
  {
    key: 5,
    value: 5,
    emoji: Emoji5,
  },
]

const ModalRated = ({ openModal, onCloseModal }) => {
  const [isCheckedIndex, setIsCheckedIndex] = useState(-1)

  const isChecked = (index) => {
    return isCheckedIndex === index
  }

  return (
    <Modal open={openModal} onClose={onCloseModal}>
      <Container
        maxWidth='lg'
        sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center' }}
      >
        <GlassBox opacity={1} sx={{ width: '100%', padding: '30px' }}>
          <Stack direction='row' justifyContent='flex-end'>
            <IconButton onClick={onCloseModal}>
              <Close />
            </IconButton>
          </Stack>
          <Stack gap={3} justifyConten='center' alignItems='center'>
            <Typography variant='h2' color='primary' textAlign='center'>
              Bạn cảm thấy chất lượng dịch vụ của chúng tôi như nào ?
            </Typography>
            <Stack direction='row' gap={2} justifyContent='center'>
              {ratedValues.map((value) => (
                <Box key={value.key}>
                  <input
                    hidden
                    type='radio'
                    name='rated'
                    value={value.value}
                    id={`rated-input-${value.key}`}
                    onChange={() => setIsCheckedIndex(value.value)}
                  />
                  <label htmlFor={`rated-input-${value.key}`}>
                    <CustomEmoji
                      className={isChecked(value.key) ? 'active' : ''}
                      src={value.emoji}
                    />
                  </label>
                </Box>
              ))}
            </Stack>
            <RatedCommentInput placeholder='Viết đánh giá của bạn'></RatedCommentInput>
            <MainButton
              colorType='primary'
              sx={{ borderRadius: '50px', alignSelf: 'center' }}
              endIcon={<Send />}
            >
              Gửi
            </MainButton>
          </Stack>
        </GlassBox>
      </Container>
    </Modal>
  )
}

const RatedCommentInput = styled('textarea')`
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #eeeeee;
  height: 100px;
  font-size: 16px;
  outline: none;
  resize: none;
  width: 100%;
`

const CustomEmoji = styled(Avatar)`
  width: 60px;
  height: 60px;
  filter: grayscale(100%);
  transition: 0.3s;
  cursor: pointer;
  transform-origin: center;

  &.active {
    transform: scale(1.5);
    filter: grayscale(0%);
  }

  &:hover {
    transform: scale(1.5);
    filter: grayscale(0%);
  }
`

export default ModalRated
