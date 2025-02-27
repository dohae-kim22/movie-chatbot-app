# Movie Search Application with Chatbot Integration

This is a **Movie Search Web Application** built using **TypeScript**, leveraging the **OMDb API** to fetch movie details and **OpenAI GPT-3.5-turbo model** for personalized movie recommendations. The application allows users to search for movies by title, view detailed information about movies, and interact with a **chatbot** that provides personalized recommendations based on their favorite movies or genres.

## Features

- **Search for movies** by title using the OMDb API.
- **View movie details**: Get information about posters, ratings, plot, actors, director, and etc.
- **Chatbot movie recommendations**: The chatbot uses OpenAI’s GPT-3.5-turbo model to recommend movies based on the user’s favorite movies or genres.
- **Responsive design**: Optimized for both mobile and desktop views.
- **Dynamic navigation**: Switch between the homepage and movie detail page.
- **Easy access to OMDb API**: Fetch movie data seamlessly.

## Chatbot Integration

The application now includes a **movie recommendation chatbot** powered by **OpenAI’s GPT-3.5-turbo model**. The chatbot can:

- Respond to user queries about movie recommendations based on their favorite movies or genres.
- Use natural language processing to generate personalized suggestions.
- Interact with the **OMDb API** to provide detailed information about the recommended movies.

### How it Works:

1. **User Interaction**: The user can enter their favorite movie or genre into the chatbot.
2. **OpenAI API**: The chatbot sends the user’s input to the OpenAI API, which processes the request and returns relevant movie recommendations.
3. **Movie Suggestions**: The chatbot responds with a list of recommended movies. The OMDb API is then queried for additional details (e.g., plot, actors, director, ratings, etc.) for the suggested movies.

## Live Demo

You can check out the live demo of this project hosted on [Vercel](https://movie-chatbot-app.vercel.app/#/).

## Screenshots

Here are some updated screenshots of the application:

### Home Page with Chatbot:

![Home Page](https://github.com/dohae-kim22/movie-chatbot-app/blob/main/asset/screenshot/homepage.png)

### Search Results:

![Search Results](https://github.com/dohae-kim22/movie-chatbot-app/blob/main/asset/screenshot/search-movie.png)

### Movie Detail Page:

![Movie Detail Page](https://github.com/dohae-kim22/movie-chatbot-app/blob/main/asset/screenshot/movie-detail.png)

## Technologies Used

- **TypeScript** for frontend logic and type safety.
- **OMDb API** for fetching movie data.
- **OpenAI GPT-3.5-turbo model** for chatbot movie recommendations.
- **HTML/CSS** for frontend structure and styling.
