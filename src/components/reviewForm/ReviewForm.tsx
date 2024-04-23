import { Avatar, Card, CardContent, CardHeader, TextField, CardActions, Button } from "@mui/material";

import { Rating } from "../generic/rating/Rating";
import { useReviewForm } from "../../hooks/useReviewForm/useReviewForm";


export const ReviewForm = () => {
  const { onCancel, onSubmit, values, setValues, selectedMovie } = useReviewForm();

  return selectedMovie && (
    <form onSubmit={onSubmit}>
      <Card sx={{
        marginTop: '16px',
      }}>
        <CardHeader
          title={selectedMovie.title}
          subheader={selectedMovie?.companyName}
          avatar={
            <Avatar aria-label="recipe">
              {selectedMovie.title?.split('')[0]}
            </Avatar>
          }
        />
        <CardContent>
            <p>Please provide some feedback about the movie</p>
            <Rating values={[values.rating]} onChange={(e, newValue) => setValues('rating', newValue * 2)}/>
            <br />
            <TextField
              id="outlined-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              value={values.description}
              onChange={(e) => setValues('description', e.target.value)}
              minRows={4}
              multiline
            />
        </CardContent>

        <CardActions>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="submit" variant="contained">Submit</Button>
        </CardActions>
      </Card>
    </form>
  );
};
