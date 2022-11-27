import { dateFormat, formatDateToHour } from '../../../../../utils/dateFormat'
import formatPrice from '../../../../../utils/formatPrice'

export const getHtmlTemplate = (info) => {
  const { storeInfo, user, serviceUsed, totalServicePrice, discountPrice } = info
  const today = new Date()
  return `
    <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    role="presentation"
    style="
      max-width: 570px;
      background-color: #fff;
      margin: 0 auto;
      padding: 15px;
    "
  >
    <tr>
      <td align="center">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tr>
            <td>
              <div>
                <div style="border-radius: 50%; width: 100px; height: 100px; overflow: hidden; margin: 0 auto;">
                    <img src="https://res.cloudinary.com/deqhqs09b/image/upload/v1667559552/hq5qjqy4esmdfyvxxkqr.png" alt="" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td cellpadding="0" cellspacing="0">
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  font-family: 'Helvetica Neue', Arial, sans-serif;
                  line-height: 22px;
                "
              >
                <tr>
                  <td>
                    <h2 style="text-align: center;">
                    Beauty Paradise
                    </h2>
                    <h3 style="text-align: center;">
                      Cảm ơn vì bạn đã sử dụng dịch vụ
                    </h3>
                    <p>Hi, ${user.name}</p>
                    <p>
                      Lời đầu tiên, chúng tôi Beauty Paradise xin gửi lời cám ơn chân
                      thành và sâu sắc nhất đến Quý khách hàng đã tin tưởng
                      lựa chọn và sử dụng dịch vụ của chúng tôi trong thời
                      gian vừa qua. Đây là một món quà vô giá đối với chúng
                      tôi. Nhờ sự tin tưởng của Quý khách hàng mà chúng tôi có
                      được sự thành công như ngày hôm nay.
                    </p>
                    <p>Thời gian: ${formatDateToHour(today)} ngày ${dateFormat(today)}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        color: #000;
                        font-family: 'Helvetica Neue', Arial, sans-serif;
                        font-size: 15px;
                        line-height: 22px;
                        margin-top: 15px;
                        border-collapse: collapse;
                      "
                    >
                      <tr
                        style="
                          border-bottom: 1px solid #ecedee;
                          text-align: left;
                        "
                      >
                        <th style="padding: 0 15px 10px 0;">Dịch vụ</th>
                        <th style="padding: 0 15px;">Số lượng</th>
                        <th style="padding: 0 0 0 15px;" align="right">
                          Giá
                        </th>
                      </tr>
                        ${serviceUsed
                          .map((item) => {
                            return `
                              <tr>
                              <td style="padding: 5px 15px 5px 0;">${item.service.name}</td>
                              <td style="padding: 0 15px;">x 1</td>
                              <td style="padding: 0 0 0 15px;" align="right">
                              ${formatPrice(item.service.price)}
                              </td>
                            </tr>
                            `
                          })
                          .join('')}
                      <tr
                        style="
                          border-bottom: 2px solid #ecedee;
                          text-align: left;
                          padding: 15px 0;
                        "
                      >
                        <td
                          style="padding: 8px 15px 5px 0; font-weight: bold;"
                        >
                          Voucher
                        </td>
                        <td style="padding: 0 15px;"></td>
                        <td style="padding: 0 0 0 15px;" align="right">
                          - ${formatPrice(discountPrice)}
                        </td>
                      </tr>
                      <tr
                        style="
                          border-bottom: 2px solid #ecedee;
                          text-align: left;
                          padding: 15px 0;
                        "
                      >
                        <td
                          style="
                            padding: 15px 15px 15px 0;
                            font-weight: bold;
                          "
                        >
                          Tổng
                        </td>
                        <td style="padding: 0 15px;"></td>
                        <td
                          style="padding: 0 0 0 15px; font-weight: bold;"
                          align="right"
                        >
                          ${formatPrice(totalServicePrice - discountPrice)}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="font-size: 14px; margin-top: 30px;">
                      Một lần nữa, chúng tôi xin gửi lời cảm ơn chân thành đến
                      Quý khách hàng. Chúc bạn luôn có nhiều sức khỏe, may mắn
                      và thành công!
                    </p>
                    <p>Trân trọng!</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table
                      class="email-footer"
                      align="center"
                      width="570"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <td class="content-cell" align="center">
                          <p style="font-size: 14px;">
                            Beauty Paradise
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
    `
}
