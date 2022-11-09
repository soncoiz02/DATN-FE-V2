import { styled } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const DataGridCustom = ({ rows, columns, ...other }) => {
  return (
    <CustomDataGird
      rows={rows}
      columns={columns}
      disableSelectionOnClick
      {...other}
      localeText={{
        errorOverlayDefaultLabel: 'Đã có lỗi xảy ra',
        noResultsOverlayLabel: 'Không có dữ liệu',
        columnMenuLabel: 'Danh sách',
        columnMenuShowColumns: 'Hiển thị các cột',
        columnMenuFilter: 'Lọc',
        columnMenuHideColumn: 'Ẩn',
        columnMenuUnsort: 'Hủy sắp xếp',
        columnMenuSortAsc: 'Sắp xếp trước - sau',
        columnMenuSortDesc: 'Sắp xếp sau - trước',
        columnsPanelShowAllButton: 'Hiện tất cả',
        columnsPanelHideAllButton: 'Ẩn tất cả',
        footerRowSelected: (count) =>
          count !== 1
            ? `${count.toLocaleString()} hàng đã chọn`
            : `${count.toLocaleString()} hàng đã chọn`,
        noRowsLabel: 'Không có dữ liệu',
      }}
    />
  )
}

const CustomDataGird = styled(DataGrid)`
  border: none;

  .MuiDataGrid-columnHeaders {
    background: #ceedff;
    border: none;
    border-radius: 10px;
  }

  .MuiDataGrid-virtualScroller {
    margin-top: 65px !important;
  }

  .MuiDataGrid-columnSeparator {
    display: none;
  }

  .MuiDataGrid-columnHeader:focus,
  .MuiDataGrid-cell:focus {
    outline: none;
  }

  .MuiDataGrid-columnHeader:focus-within,
  .MuiDataGrid-cell:focus-within {
    outline: none;
  }

  .MuiDataGrid-columnHeaderTitle {
    color: #494949;
    font-weight: 700;
  }

  .MuiDataGrid-cell {
    border: none;
  }

  .MuiDataGrid-row {
    margin: 5px 0;
  }
`

export default DataGridCustom
