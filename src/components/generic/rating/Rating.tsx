import Box from '@mui/material/Box';
import { Chip, Rating as MaterialRating } from '@mui/material';

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

export const Rating = ({ values, readOnly, onChange }) => {
  const value = Math.floor(values.reduce((acc, item) => (acc + item), 0) / values.length);
  return (
    <Box
      sx={{
        width: 'max-content',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <MaterialRating
        name="text-feedback"
        value={value/2}
        onChange={onChange}
        readOnly={readOnly}
        precision={0.5}
      />
      {!readOnly && value > 0 && <Chip sx={{ marginLeft: '6px' }} label={labels[value / 2]} />}
    </Box>
  );
}