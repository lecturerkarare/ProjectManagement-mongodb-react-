import colors from '../lib/colors';
import CustomPagination from '../lib/CustomPagination/CustomPagination'
import { styled } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Spinner } from '../utils/Spinner';
// import CustomPagination from 'components/table/CustomPagination/CustomPagination';
// import React from 'react';

interface ITableProps {
  rows: any[];
  columns?: GridColDef[];
  loading?: boolean;
  count?: any;
  page?: number;
  setPage?: (arg: number) => void;
  handleOnClick?: any;
  handleOnCellClick?: (arg: string) => void;
  pagination?: any;
  rowHeight?: any;
}

const ReusableTable = ({
  rows,
  columns,
  loading,
  count,
  page,
  setPage,
  pagination = false,
  handleOnClick,
  rowHeight = 25,
  checkboxSelection = false,
  handleOnCellClick,
  onSelectionModelChange,
  isRowSelectable,
  selectionModel
}: any) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative'
      }}>
      <CustomDataGrid
        rows={rows}
        rowHeight={rowHeight}
        loading={loading}
        columns={columns}
        showColumnVerticalBorder={true}
        rowSelectionModel={selectionModel}
        showCellVerticalBorder={true}
        checkboxSelection={checkboxSelection}
        disableColumnMenu={false}
        disableVirtualization
        onCellClick={handleOnCellClick}
        onRowClick={handleOnClick}
        disableColumnFilter={false}
        onRowSelectionModelChange={onSelectionModelChange}
        disableDensitySelector={true}
        isRowSelectable={isRowSelectable}
        sx={{
          '.MuiDataGrid-cell': {
            fontSize: '12px',
            fontWeight: 'small',
            color: '#000'
          },
          '.MuiDataGrid-virtualScrollerRenderZone': {
            width: '100% !important'
          }
        }}
        slots={{
          loadingOverlay: Spinner,
          noRowsOverlay: () => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                fontSize: '16px',
                color: colors.grey,
                backgroundColor: '#f5f5f5'
              }}>
              No data available
            </div>
          ),
          pagination: () => (
            <div style={{ float: 'right' }}>
              <CustomPagination count={count} page={page} setPage={setPage} />
            </div>
          )
        }}
        pagination
      />
    </div>
  );
};

export default ReusableTable;

const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeader': {
    height: '30px !important'
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    whiteSpace: 'nowrap'
  },
  '& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus': {
    outline: 'none !important'
  },
  '& .MuiDataGrid-row': {
    borderRadius: '4px',
    '&:nth-of-type(odd)': {
      backgroundColor: 'white'
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#F4F4F4'
    }
  },
  '& .MuiDataGrid-cell': {
    cursor: 'pointer'
  },
  '& .MuiDataGrid-cellContent': {
    fontSize: '12px',
    fontWeight: 400,
    color: colors.grey
  },
  '& .MuiDataGrid-footerContainer': {
    minHeight: '32px',
    marginTop: '30px',
    '& .MuiPagination-root': {
      margin: '0 auto'
    }
  },
  '& .MuiDataGrid-virtualScroller': {
    maxHeight: '700px',
    overflowY: 'auto'
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
    width: '8px !important'
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
    backgroundColor: '#888',
    borderRadius: '2px'
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555'
  }
}));
