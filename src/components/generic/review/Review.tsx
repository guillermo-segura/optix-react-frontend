import { Box, Chip, Rating } from '@mui/material';

interface Labels {
  [index: string]: string;
}

export interface ReviewProps {
  values: number[];
  readOnly?: boolean;
  onChange?: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void;
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

const round = (value: number, precision: number): number => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

const avg = (values: number[]): number => {
  return (values.reduce((total, value) => (total + value), 0)) / values.length;
}

export const Review = ({
  values,
  readOnly = false,
  onChange = undefined,
}: ReviewProps): React.ReactNode => {
  const value = round(avg(values), 1);
  
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        sx={{ marginRight: '6px' }}
        name="movie-review"
        value={value / 2}
        onChange={onChange}
        readOnly={readOnly}
        precision={0.5}
      />
      {readOnly && <span>{value}</span>}
      {!readOnly && value > 0 && <Chip label={labels[value / 2]} />}
    </Box>
  );
}