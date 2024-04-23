import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const PAGE_SIZE = 10;

export const Table = ({ rows, columns, onClickRow, selectedRow }) =>  {
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[PAGE_SIZE]}
        onRowSelectionModelChange={onClickRow}
        rowSelectionModel={selectedRow}
        checkboxSelection
        disableMultipleRowSelection
      />
    </Box>
  );
}