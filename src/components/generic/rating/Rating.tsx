import Box from '@mui/material/Box';
import { Rating as MaterialRating, Tooltip } from '@mui/material';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export const Rating = ({ values }) => {
  const value = Math.floor(values.reduce((acc, item) => (acc + item), 0) / values.length);
  return (
    <Tooltip title={`${value} / 10`} placement="left">
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <MaterialRating
          name="text-feedback"
          value={value/2}
          readOnly
          precision={0.5}
          size="small"
        />
      </Box>
    </Tooltip>
  );
}