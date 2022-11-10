import { Link, Stack, styled } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import categoryApi from '../../../../api/category'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'

const ListCategory = () => {
  const [listCategory, setListCategory] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  const handleGetCategories = async () => {
    try {
      const data = await categoryApi.getAll('client')
      setListCategory(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetCategories()
  }, [])

  return (
    <Stack
      direction='row'
      gap={2}
      sx={{ width: '100%', overflow: 'auto', whiteSpace: 'nowrap', py: 2 }}
    >
      <CategoryLink
        underline='none'
        className={searchParams.get('cate') ? null : 'active'}
        component={RouterLink}
        to={`/service`}
      >
        Tất cả
      </CategoryLink>
      {listCategory &&
        listCategory.map((item) => (
          <CategoryLink
            underline='none'
            className={searchParams.get('cate') === item._id ? 'active' : null}
            component={RouterLink}
            to={`/service?cate=${item._id}`}
          >
            {item.name}
          </CategoryLink>
        ))}
    </Stack>
  )
}

const CategoryLink = styled(Link)(
  ({ theme }) => `
    display: inline-block;
    text-align: center;
    padding: 10px 25px;
    border-radius: 50px;
    background: white;
    box-shadow: 0px 12px 16px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px rgba(145, 158, 171, 0.2);
    cursor: pointer;
    transition: 0.3s;
    &:hover {
        background: #ffeaee;
    }

    &.active {
        background: ${theme.palette.primary.main};
        color: white;
    }

    ${theme.breakpoints.down('sm')} {
        padding: 8px 15px;
    }
`,
)

export default ListCategory
