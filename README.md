## Optix React Frontend

### Description

This's been a fun project. I was familiar with MUI, but I've never used it as much as in this project.

This is also the first time I set up a Docker image; I've used them in the past, but I wasn't the person doing the images' setup.

![homepage](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/homepage.png?raw=true)

For the interactive table, I've used the Data Grid from MUI X. I believe that it is a scalable solution that fulfills all the requirements out of the box.

I've also made use of the Rating component, which I found very useful from a user point of view; I made a a custom Review component with it to add responsiveness and display the review score of the movies.

![review_card](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/review_card.png?raw=true)

Finally, I've made some closeable notifications and displayed them at the top-right side of the screen.

![notification](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/notification.png?raw=true)

### Mobile version

On small screens, I made sure the refresh buttons displays only the icon, and my Review component displays a single star - following IMDB's approach.

The review form is displayed in a modal as requested.

![homepage_sm](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/homepage_sm.png?raw=true)

![review_modal](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/review_modal.png?raw=true)

### Setup

These are the steps to run this project locally:

1. Clone repository

```
    git clone git@github.com:guillermo-segura/optix-react-frontend.git
```

2. Create `.env` file

```
    cp .env.example .env
```

3. Mount Docker image

```
    npm run dev
```

If you want to run this project directly in your local machine:

4. Install dependencies

```
    npm install
```

5. Run `vite`

```
    npm start
```

## Technical Challenge

![initial-project](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/initial_project.png?raw=true)

Our developer was part way through developing the following feature but left the company and you are tasked with picking up where they left off.

The aim is to complete the piece of work by refactoring and improving the current code to get it to a working state that passes all A/C. Use material UI components and a form library where desirable.

Please return as a link to a public GIT store of your choice. e.g. Github

***A/C***
Must have(s)
* Display total number of movies.
* Table must show movie title, average review score to 1 decimal place and company that produces the film.
    * Movie company data comes from movieCompanies GET request.
    * Movies data comes from movies GET request.
* User must be able to select table row to leave a review with form appearing when there is a selected movie.
    * POST request to submitReview endpoint and display message returned on response.
    * Form must restrict message to 100 characters and show an error message if over 100 and not allow for submission in this instance.
* Highlight selected movie row when clicked.
* Handle error and loading states.

Should have(s)
* Review column should be sortable.
* Submit review form should appear in a modal on mobile devices or small breakpoints.

Could have(s)
* Add a button (or other mechanism) to refresh movies and movie companies.
* Containerise application using docker.


The three endpoints to be used are:
* GET movie companies: http://localhost:4321/movieCompanies
* GET movies: http://localhost:4321/movies
* POST review: http://localhost:4321/submitReview
    * body {review: message}

Please run server locally from https://github.com/michaelOptix1/starter-express-api
