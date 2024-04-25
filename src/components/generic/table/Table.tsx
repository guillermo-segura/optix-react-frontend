import { memo } from 'react';
import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GridCallbackDetails,
  GridInputRowSelectionModel,
} from '@mui/x-data-grid';

const PAGE_SIZE = 10;

export interface TableProps {
  rows: any[];
  columns: readonly GridColDef<any>[];
  onClickRow?: (rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) => void;
  selectedRow?: GridInputRowSelectionModel
}

export const Table = memo(({
  rows,
  columns,
  onClickRow,
  selectedRow
}: TableProps): JSX.Element =>  {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[PAGE_SIZE]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: PAGE_SIZE,
            },
          },
        }}
        onRowSelectionModelChange={onClickRow}
        rowSelectionModel={selectedRow}
        checkboxSelection
        disableMultipleRowSelection
      />
    </Box>
  );
});
