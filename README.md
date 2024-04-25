## Optix React Frontend

### Description

Cool project about refactoring a codebase and turn it into a functional page that display a list of movies and allow the user to review them.

This has been a cool project. It allowed me to explore [MUI-Core](https://mui.com/material-ui/all-components/) and [MUI-X](https://mui.com/x/introduction/), as well as as Docker; I've used Docker in the past, but it's the first time I do the images' setup.

![homepage](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/homepage.png?raw=true)

For the interactive table, I've used the `Data Grid` component; not only it is a scalable and customizable solution, but also fulfills all the user requirements right out of the box.

I build a custom `Review` component using the MUI `Rating` component. I made it responsive and displayed extra information both in the editable and non-editable versions to improve the user experience.

![review_card](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/review_card.png?raw=true)

In addition, I built closeable notifications and displayed them at the top-right side of the screen.

![notification](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/notification.png?raw=true)

### Mobile version

On small screens, the `Refresh` button becomes an icon-only button, and the `Review` component displays a single star alongside the score - following IMDB's approach.

The review form is displayed in a modal as requested.

![homepage_sm](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/homepage_sm.png?raw=true)

![review_modal](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/review_modal.png?raw=true)

### Project Setup

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

==IMPORTANT ⚠️==  If you intend to run the project locally and not through the Docker image, make sure you run `npm run dev` at least once BEFORE `npm run install`. Running `npm run install` first leads to an error when running the Docker image afterwards.

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

Our developer was part way through developing the following feature but left the company and you are tasked with picking up where they left off.

![initial-project](https://github.com/guillermo-segura/optix-react-frontend/blob/main/assets/initial_project.png?raw=true)

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
