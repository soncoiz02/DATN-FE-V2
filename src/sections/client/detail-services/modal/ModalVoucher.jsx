import { Search } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Input,
  InputAdornment,
  InputBase,
  ListItem,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import React, { useEffect } from 'react'
import { useState } from 'react'
import userApis from '../../../../api/user'
import GlassBox from '../../../../components/GlassBox'
import useAuth from '../../../../hook/useAuth'
import { dateFormat } from '../../../../utils/dateFormat'
import MainButton from '../../../../components/MainButton'

const ModalVoucher = ({ storeId, getVoucherInfo, closePopup }) => {
  const [listVouchers, setListVouchers] = useState([])

  const { token } = useAuth()

  const handleGetUserVouchers = async () => {
    try {
      const vouchers = await userApis.getUserVoucher(token, storeId)
      setListVouchers(vouchers)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDisableVoucher = (date) => {
    const currentDate = new Date()
    const expireDate = new Date(date)
    return currentDate > expireDate
  }

  const getVoucher = (id) => {
    const voucherInfo = listVouchers.find((item) => item._id === id)
    closePopup()
    getVoucherInfo(voucherInfo)
  }

  useEffect(() => {
    handleGetUserVouchers()
  }, [])

  return (
    <GlassBox
      opacity={0.9}
      sx={{ width: { md: '600px', xs: '95%' }, p: { md: '15px', xs: '10px' } }}
    >
      <Stack gap={2}>
        <CustomInput
          placeholder='Tìm mã giảm giá'
          endAdornment={
            <InputAdornment position='end'>
              <Search />
            </InputAdornment>
          }
        />
        <Stack
          gap={{ md: 2, sx: 1 }}
          sx={{ maxHeight: '400px', minHeight: '200px', overflowY: 'auto' }}
        >
          {listVouchers &&
            listVouchers.map((voucher) => (
              <ListItem disabled={handleDisableVoucher(voucher.endDate)} key={voucher._id}>
                <VoucherWrapper direction='row'>
                  <Stack sx={{ width: '25%', pr: 1 }} alignItems='center'>
                    <Avatar
                      sx={{ width: { md: '60px', sx: '50px' }, height: { md: '60px', sx: '50px' } }}
                      src={voucher.storeId.avt}
                    />
                    <Typography variant='h6' textAlign='center'>
                      {voucher.storeId.name}
                    </Typography>
                  </Stack>
                  <Box sx={{ width: '75%', px: 2, borderLeft: '1px dashed gray' }}>
                    <Typography variant='h3' color='primary'>
                      {voucher.title}
                    </Typography>
                    <Stack direction='row'>
                      <VoucherDesc sx={{ width: '70%' }} variant='body2'>
                        {voucher.description}
                      </VoucherDesc>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 0.5,
                          justifyContent: 'flex-end',
                          marginY: 1,
                          width: '30%',
                        }}
                      >
                        <DiscountCircle>
                          <Typography variant='h4' color='secondary'>
                            {voucher.discount}%
                          </Typography>
                        </DiscountCircle>
                      </Box>
                    </Stack>
                    <Stack justifyContent='space-between' direction='row' alignItems='flex-end'>
                      <Typography variant='body2' color={grey[500]}>
                        HSD: {dateFormat(voucher.endDate)}
                      </Typography>
                      <ApplyButton colorType='primary' onClick={() => getVoucher(voucher._id)}>
                        <Typography variant='body2'>Sử dụng</Typography>
                      </ApplyButton>
                    </Stack>
                  </Box>
                </VoucherWrapper>
              </ListItem>
            ))}
          {listVouchers.length === 0 && (
            <Stack justifyContent='center' alignItems='center'>
              <Typography variant='h3'>Bạn không có mã giảm giá nào</Typography>
            </Stack>
          )}
        </Stack>
      </Stack>
    </GlassBox>
  )
}

const ApplyButton = styled(MainButton)`
  border-radius: 50px;
  font-size: 14px;
`

const VoucherDesc = styled(Typography)`
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  align-self: flex-start;
`

const DiscountCircle = styled(Box)(
  ({ theme }) => `
    display: flex;
    align-items: center;
    justify-content: center;
    background: #d2fff2;
    width: 50px;
    height: 50px;
    border-radius: 50%;

    ${theme.breakpoints.down('md')} {
        width: 40px;
        height: 40px;
    }
`,
)

const VoucherWrapper = styled(Stack)`
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
`

export const CustomInput = styled(InputBase)(
  ({ theme }) => `
    padding: 5px 15px;
    border-radius: 50px;
    border: 1px solid ${grey[300]};
    font-size: 12px;
    width: 100%;
    &:focus {
        border-color: ${theme.palette.primary.main};
    }
`,
)

export default ModalVoucher
