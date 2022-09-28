import { Typography } from '@mui/material'
import React from 'react'
import GlassBox from '../../../../components/GlassBox'

const TabInfo = ({ storeDesc }) => {
  const desc = storeDesc
  // console.log(storeDesc);
  ;('Excellence Spa - Chuyên gia chăm sóc sức khỏe dưỡng sinh thuần tự nhiên. Trong hơn 19 năm qua, Excellence đã giúp hơn 285 ngàn phụ nữ hết đau đầu mất ngủ, hết đau mỏi vai gáy, hết tê bì chân tay, hết đau mỏi lưng eo thận, cải thiện rối loạn nội tiết tố, đánh tan u cục, trẻ hóa cơ thể, thông kinh hoạt lạc. Đặc biệt Excellence đã giúp rất nhiều phụ nữ lấy lại vóc dáng thon gọn tuổi thanh xuân bằng phương pháp giảm cân độc quyền thuần tự nhiên. Đây là phương pháp đã giúp chính bản thân nhà sáng lập là bác sĩ Bùi Tuyết Mai giảm từ 93kg xuống còn 58kg. Excellence đã giúp phụ nữ thay đổi, trở nên khỏe mạnh hơn, tự tin hơn và hạnh phúc hơn.')

  return (
    <GlassBox sx={{ padding: '24px', borderRadius: '20px' }}>
      <Typography variant='h2' textTransform='uppercase'>
        giới thiệu
      </Typography>
      <Typography sx={{ marginTop: '15px' }} variant='subtitle1'>
        {desc}
      </Typography>
    </GlassBox>
  )
}

export default TabInfo
