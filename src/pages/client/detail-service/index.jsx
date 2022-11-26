import { Box, Container, Stack, styled, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import serviceApi from '../../../api/service'
import GlassBox from '../../../components/GlassBox'
import DescriptionTab from '../../../sections/client/detail-services/DescriptionTab'
import ModalRegisterService from '../../../sections/client/detail-services/modal/ModalRegisterService'
import RatedTab from '../../../sections/client/detail-services/RatedTab'
import ServiceInfo from '../../../sections/client/detail-services/ServiceInfo'

const DetailService = () => {
  const { id } = useParams()

  const [tabValue, setTabValue] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [serviceInfo, setServiceInfo] = useState()

  const handleGetDetailService = async () => {
    try {
      const data = await serviceApi.getOne(id)
      setServiceInfo(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleGetDetailService()
  }, [id])

  return (
    <Container maxWidth='xl' sx={{ py: 5 }}>
      <Stack gap={4}>
        {serviceInfo && (
          <>
            <ServiceInfo onOpenModal={() => setOpenModal(true)} serviceInfo={serviceInfo} />
            <GlassBox opacity={0.8}>
              <Stack gap={3}>
                <CustomTab value={tabValue} onChange={(e, value) => setTabValue(value)}>
                  <Tab label='Tổng quan' id='tab-0' aria-controls='tab-panel-0' />
                  <Tab label='Đánh giá' id='tab-1' aria-controls='tab-panel-1' />
                </CustomTab>
                <DescriptionTab value={tabValue} index={0} serviceInfo={serviceInfo} />
                <RatedTab serviceId={serviceInfo._id} value={tabValue} index={1} />
              </Stack>
            </GlassBox>
            {openModal && (
              <ModalRegisterService
                serviceInfo={serviceInfo}
                openModal={openModal}
                onCloseModal={() => setOpenModal(false)}
              />
            )}
          </>
        )}
      </Stack>
    </Container>
  )
}

const CustomTab = styled(Tabs)(({ theme }) => ({
  '.MuiButtonBase-root': {
    borderRadius: '10px',
    transition: '0.3s',
    '&.Mui-selected': {
      color: 'white',
    },
  },
  '.MuiTabs-indicator': {
    height: '100%',
    borderRadius: '10px',
    zIndex: -1,
  },
}))

export default DetailService
