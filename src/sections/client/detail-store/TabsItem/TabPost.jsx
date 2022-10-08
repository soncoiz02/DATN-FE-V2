import {
  Favorite,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreVert,
  Send,
  SentimentSatisfiedAlt,
  Share,
  Sms,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import React, { useState } from 'react'
import styled from 'styled-components'
import GlassBox from '../../../../components/GlassBox'
import MainButton from '../../../../components/MainButton'

const TabPost = () => {
  const theme = useTheme()
  const text =
    'This impressive paella is a perfect party dish and a fun meal to cook together with your guests.Add 1 cup of frozen peas along with the mussels, if you like.Lorem ipsum dolor sit amet consectetur, adipisicing elit.Obcaecati dolorum illum dignissimos qui doloribus expedita natus voluptatem! Corrupti, ipsa quia consequatur reprehenderit nostrum quo autem nulla nihil culpa illo iste! Lorem ipsum dolor, sit amet consectetur adipisicing elit.Cupiditate repellendus aspernatur laboriosam distinctio sint blanditiis impedit labore eum voluptatibus deleniti enim doloremque mollitia rem, nisi culpa non quo aliquid quae ? Lorem ipsum dolor sit amet consectetur adipisicing elit.Corporis possimus doloribus rerum tempora perferendis debitis dolorem eum repellendus ab cum illum doloremque, vel consequatur iure quis obcaecati ipsa, exercitationem at!'
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props
    return <IconButton {...other} />
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions?.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }))

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const arrayComment = [1, 2, 23, 4, 4, 4, 4, 4, 4]

  const [arrCmtLength, setArrCmtLength] = useState(3)

  const onClickSeeMore = () => {
    setArrCmtLength((pre) => pre + 3)
  }

  const onClickSeeLess = () => {
    setArrCmtLength(3)
  }

  const StyledSumAction = styled(Typography)`
    font-size: 16px;
    font-weight: 700;
    margin-left: 5px;
    @media (max-width: 768px) {
      font-size: 12px;
    }
  `

  return (
    <div>
      <Container
        maxWidth='lg'
        sx={{
          padding: 0,
        }}
      >
        <Card
          sx={{
            maxWidth: 1,
            padding: { xs: '9px 17px 6px 17px', sm: '18px 35px 11px 35px' },
            borderRadius: '20px',
            boxShadow:
              '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2)',
          }}
        >
          <CardHeader
            sx={{
              padding: '0',
              marginBottom: '14px',
              color: '#4B5563',
              fontSize: '16px',
              '& .MuiCardHeader-title': {
                fontWeight: '700',
                textTransform: 'capitalize',
              },
              '& .MuiCardHeader-subheader': {
                fontSize: '14px',
              },
            }}
            avatar={
              <Avatar
                sx={{
                  height: '50px',
                  width: '50px',
                }}
                aria-label='recipe'
                src='https://inkythuatso.com/uploads/thumbnails/800/2022/05/bugcat-capoo-05-10-11-35-41.jpg'
              ></Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVert />
              </IconButton>
            }
            title='ngô việt dũng'
            subheader='08/07/2002'
          />
          <CardContent sx={{ padding: '0', marginBottom: '14px' }}>
            <StyleTitlePost color='text.secondary'>
              {isReadMore ? text.slice(0, 300) : text}{' '}
              <ReadMoreOrLess onClick={toggleReadMore} className='read-or-hide'>
                {isReadMore ? '...read more' : ' show less'}
              </ReadMoreOrLess>
            </StyleTitlePost>
          </CardContent>
          <CardMedia
            component='img'
            sx={{
              maxWidth: 1,
              width: 1,
              height: { xs: '250px', sm: '500px' },
              objectFit: 'contain',
              marginBottom: '14px',
              borderRadius: '5px',
            }}
            image='https://pbs.twimg.com/media/E03VPu3WQAIGKSq.jpg:large'
            alt='Paella dish'
          />
          <CardActions
            disableSpacing
            sx={{
              padding: '0',
              marginBottom: '14px',
              justifyContent: { xs: 'center', sm: 'flex-end' },
            }}
          >
            <Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
              <Stack direction={'row'} alignItems={'center'}>
                <IconButton
                  sx={{ color: theme.palette.primary.main, borderRadius: '5px' }}
                  aria-label='add to favorites'
                >
                  <Favorite />
                  <StyledSumAction>12 Thích</StyledSumAction>
                </IconButton>
              </Stack>
              <Stack direction={'row'} alignItems={'center'}>
                <IconButton
                  sx={{ color: '#4b5563', borderRadius: '5px' }}
                  aria-label='add to favorites'
                >
                  <Sms />
                  <StyledSumAction>{arrayComment.length} Bình luận</StyledSumAction>
                </IconButton>
              </Stack>
              <Stack direction={'row'} alignItems={'center'}>
                <IconButton
                  sx={{ color: '#4b5563', borderRadius: '5px' }}
                  aria-label='add to favorites'
                >
                  <Share />
                  <StyledSumAction>Chia sẻ</StyledSumAction>
                </IconButton>
              </Stack>
            </Stack>
          </CardActions>
          <Divider />
          <CardContent sx={{ padding: 0, paddingTop: '7px' }}>
            <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>Tất cả bình luận</Typography>
            {arrayComment.slice(0, arrCmtLength)?.map((item, index) => (
              <Box key={index} sx={{ marginTop: '14px' }}>
                <Stack direction={'row'} spacing={2}>
                  <Box>
                    <Avatar
                      sx={{
                        width: '50px',
                        height: '50px',
                      }}
                      src='https://i.pinimg.com/474x/cb/89/66/cb8966b3fa989ec1e34f03f158374187--totoro-gif.jpg'
                    />
                  </Box>
                  <Box>
                    <Box>
                      <Stack alignItems={'center'} spacing={1} direction='row'>
                        <StyleNameComment sx={{}}>Trần bảo sơn</StyleNameComment>
                        <StyleTimeComment
                          sx={{
                            fontSize: '12px',
                            fontWeight: '500',
                          }}
                        >
                          1 giờ trước
                        </StyleTimeComment>
                      </Stack>
                    </Box>
                    <Box>
                      <StyleContentComment>
                        Mát xa lành mạnh. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Minima sint harum nostrum mollitia nisi facilis asperiores, quaerat facere,
                        debitis, eligendi neque ea iure deserunt assumenda modi tempore alias nulla
                        beatae?.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dicta
                        eligendi doloribus repellendus officiis iusto fugit explicabo similique,
                        accusamus sint nemo commodi voluptatem at, consequatur ex nihil aut, cum
                        esse!
                      </StyleContentComment>
                    </Box>
                  </Box>
                </Stack>
              </Box>
            ))}
            <Box sx={{ maxWidth: '150px', m: '14px auto' }}>
              <Stack justifyContent={'center'}>
                {arrayComment.length > arrCmtLength ? (
                  <ButtonMoreLess endIcon={<KeyboardArrowDown />} onClick={() => onClickSeeMore()}>
                    See more
                  </ButtonMoreLess>
                ) : (
                  <ButtonMoreLess endIcon={<KeyboardArrowUp />} onClick={() => onClickSeeLess()}>
                    See less
                  </ButtonMoreLess>
                )}
              </Stack>
            </Box>
            <Box>
              <Stack direction={'row'} spacing={2}>
                <Box
                  component='div'
                  sx={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    p: '5px 5px 5px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 1,
                    maxHeight: '60px',
                    borderRadius: '50px',
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, height: { xs: '40px', sm: 1 } }}
                    placeholder='Bình luận'
                    inputProps={{ 'aria-label': 'Tìm kiếm' }}
                  />
                  <IconButton
                    type='submit'
                    sx={{ p: '10px', backgroundColor: theme.palette.primary.main, color: '#fff' }}
                    aria-label='search'
                  >
                    <SentimentSatisfiedAlt />
                  </IconButton>
                </Box>
                <Box>
                  <MainButton
                    endIcon={<Send />}
                    sx={{ height: 1, borderRadius: '50px', padding: '15px 30px' }}
                    colorType={'primary'}
                  >
                    Gửi
                  </MainButton>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}

export default TabPost

const StyleTitlePost = styled(Typography)`
  font-size: 20px;
  font-weight: 700;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const StyleNameComment = styled(Typography)`
  font-size: 16px;
  font-weight: 700;
  text-transform: capitalize;
`

const StyleTimeComment = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
`

const StyleContentComment = styled(Typography)`
  font-size: 14px;
  font-weight: 500;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const ReadMoreOrLess = styled('span')`
  cursor: pointer;
  user-select: none;
  font-weight: 500;
`

const ButtonMoreLess = styled(Button)`
  font-size: 16px;
  font-weight: 700;
`
