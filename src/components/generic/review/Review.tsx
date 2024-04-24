import { Box, Chip, Rating, Typography } from '@mui/material';

import { round, avg } from '../../../utils/helpers/math';
import { useScreenSize } from '../../../hooks/useScreenSize/useScreenSize';

interface Labels {
  [index: string]: string;
}

export interface ReviewProps {
  value: number;
  readOnly?: boolean;
  onChange?: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void;
  label?: string;
}

const labels: Labels = {
  0.5: 'Disastrous',
  1: 'Awful',
  1.5: 'Terrible',
  2: 'Bad',
  2.5: 'Mediocre',
  3: 'Decent',
  3.5: 'Good',
  4: 'Great',
  4.5: 'Fantastic',
  5: 'Masterpiece',
};

export const Review = ({
  value,
  label = '',
  readOnly = false,
  onChange = undefined,
}: ReviewProps): JSX.Element => {
  const screenSize = useScreenSize();
  
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {label && <Typography variant="body2">{label}</Typography>}
      <Rating
        sx={{ margin: '0 6px' }}
        name="movie-review"
        value={value / 2}
        onChange={onChange}
        readOnly={readOnly}
        precision={0.5}
        max={readOnly && screenSize === 'sm' ? 1 : 5}
      />
      {readOnly && <span>{value} / 10</span>}
      {!readOnly && value > 0 && <Chip label={labels[value / 2]} />}
    </Box>
  );
}