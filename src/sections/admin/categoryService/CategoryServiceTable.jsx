import React, { useState } from 'react'
import GlassBox from '../../../components/GlassBox'
import categoryApi from '../../../api/category'
import { useEffect } from 'react'
import { IconButton, Stack, useMediaQuery, useTheme, Switch } from '@mui/material'
import { Delete, ModeEditOutline } from '@mui/icons-material'
import DataGridCustom from '../../../components/DataGridCustom'
import ModalRegisterForm from '../../../sections/admin/categoryService/ModalRegisterForm'
import EditCategoryService from '../../../sections/admin/categoryService/EditForm'

const CategoryServicesTable = () => {
  const [rows, setRows] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [registerId, setRegisterId] = useState()

  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      width: isMobile ? 50 : 80,
    },
    {
      field: 'infoCategory',
      headerName: 'Tên danh mục',
      width: isMobile ? 130 : 180,
      valueGetter: (params) => {
        return `${params.row.name}`
      },
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: isMobile ? 130 : 180,
      renderCell: (params) => {
        const cellData = params.row
        if (cellData.status == 0) {
          return <Switch />
        } else {
          return <Switch defaultChecked />
        }
      },
    },
    {
      field: 'action',
      headerName: '',
      flex: isMobile ? 0 : 1,
      renderCell: (params) => {
        return (
          <Stack direction='row' gap={2}>
            <IconButton>
              <Delete color='primary' />
            </IconButton>
            <IconButton
              onClick={() => {
                setRegisterId(params.id)
                setOpenModal(true)
              }}
            >
              <ModeEditOutline color='secondary' />
            </IconButton>
          </Stack>
        )
      },
    },
  ]

  const handleGetCateforyServicesRegister = async () => {
    try {
      const data = await categoryApi.getAll()
      const rowData = data.map((item, index) => ({
        ...item,
        index: index + 1,
        id: item._id,
      }))
      setRows(rowData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    handleGetCateforyServicesRegister()
  }, [])

  return (
    <Stack gap={2}>
      <GlassBox sx={{ overflowX: 'auto', padding: { xs: '15px', sm: '30px' }, height: '800px' }}>
        <DataGridCustom rows={rows} columns={columns} />
      </GlassBox>
      {openModal && (
        <EditCategoryService
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
          registerId={registerId}
          resetCategory={() => setRegisterId(null)}
        />
      )}
    </Stack>
  )
}

export default CategoryServicesTable
