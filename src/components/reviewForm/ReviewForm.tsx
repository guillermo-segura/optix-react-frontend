import { Avatar, Card, CardContent, CardHeader, TextField, CardActions, Button } from "@mui/material";
import { useState, useContext } from "react";
import { Rating } from "../generic/rating/Rating";
import { Context as MovieContext } from '../../context/MoviesContext';


export const ReviewForm = () => {
  const { selectMovie, state: { selectedMovie } } = useContext(MovieContext);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const onCancel = () => {
    selectMovie(undefined);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Submit clicked', description, rating);
    onCancel(undefined);
  };

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
            <Rating values={[rating]} onChange={(e, newValue) => setRating(newValue * 2)}/>
            <br />
            <TextField
              id="outlined-textarea"
              label="Multiline Placeholder"
              placeholder="Placeholder"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
