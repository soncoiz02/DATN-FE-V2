import { Menu } from '@mui/icons-material'
import { Container, IconButton, Link, Stack, styled, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import MainButton from '../../components/MainButton'

const Header = ({ openMenu }) => {
  return (
    <HeaderWrapper>
      <Container maxWidth='xl' sx={{ height: '100%', pt: 1, pb: 1 }}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='h2'>Logo</Typography>
          <Stack direction='row' gap={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/'>
              Trang chủ
            </StyledLink>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/store'>
              Cửa hàng
            </StyledLink>
            <StyledLink variant='h5' underline='none' component={NavLink} to='/about'>
              Về chúng tôi
            </StyledLink>
          </Stack>
          <Stack direction='row' gap={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <MainButton colorType='neutral' component={RouterLink} to='/login'>
              Đăng ký
            </MainButton>
            <MainButton colorType='primary' component={RouterLink} to='/login'>
              Đăng nhập
            </MainButton>
          </Stack>
          <IconButton
            color='primary'
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            onClick={openMenu}
          >
            <Menu />
          </IconButton>
        </Stack>
      </Container>
    </HeaderWrapper>
  )
}
const HeaderWrapper = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: transparent;
`

export const StyledLink = styled(Link)(
  ({ theme }) => `
    position: relative;
    padding: 10px 25px;
    color: ${grey[800]};
    text-decoration: none;
    transition: 0.3s;
    outline: none;
    border-radius: 5px;
    
    &:hover {
        background: rgba(0,0,0,0.1);
    }

    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 3px;
        border-radius: 50px;
        background: ${theme.palette.primary.main};
        bottom: 0;
        left: auto;
        right: 0;
        transition: 0.3s;
    }
    &.active {
        color: ${theme.palette.primary.main};
        &:after {
            width: 100%;
            left: 0;
            right: auto;
        }
        &:hover {
            background: none;
        }
    }
`,
)

export default Header
