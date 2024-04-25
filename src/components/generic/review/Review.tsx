import { Box, Chip, Rating, Typography } from '@mui/material';

import { useScreenSize } from '../../../hooks/useScreenSize/useScreenSize';
import { labels } from './labels';
export interface ReviewProps {
  value: number;
  readOnly?: boolean;
  onChange?: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void;
  label?: string;
}

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