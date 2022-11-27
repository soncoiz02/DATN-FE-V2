import { Star } from '@mui/icons-material'
import { Stack } from '@mui/material'
import { grey, yellow } from '@mui/material/colors'
import React from 'react'
import { useState } from 'react'

const ListStar = ({ spacing, number, size }) => {
  const [totalStar, setTotalStar] = useState(new Array(5).fill(null))
  return (
    <Stack direction='row' gap={spacing}>
      {totalStar.map((item, index) => (
        <Star
          key={index}
          sx={{
            color: index < number ? yellow[600] : grey[600],
            fontSize: { xs: size - 4, md: size },
          }}
        />
      ))}
    </Stack>
  )
}

export default ListStar
