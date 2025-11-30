// Dummy data for testing and development

export const user = {
  id: 1,
  username: "MovieLover123",
  email: "movielover@example.com",
  avatar: null, // Using icon instead
  joinedDate: "January 15, 2024",
  bio: "Passionate about cinema and storytelling",
};

export const movies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama", "Crime"],
    director: "Frank Darabont",
    rating: 9.3,
    poster: "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Shawshank",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    runtime: 142,
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    rating: 9.2,
    poster: "https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    runtime: 175,
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    rating: 9.0,
    poster:
      "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Dark+Knight",
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    runtime: 152,
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    rating: 8.9,
    poster:
      "https://via.placeholder.com/300x450/3a3a3a/ffffff?text=Pulp+Fiction",
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    runtime: 154,
  },
  {
    id: 5,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    rating: 8.8,
    poster: "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.",
    runtime: 148,
  },
  {
    id: 6,
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    rating: 8.8,
    poster:
      "https://via.placeholder.com/300x450/2a2a2a/ffffff?text=Forrest+Gump",
    description:
      "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man with an IQ of 75.",
    runtime: 142,
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    director: "The Wachowskis",
    rating: 8.7,
    poster: "https://via.placeholder.com/300x450/3a3a3a/ffffff?text=The+Matrix",
    description:
      "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    runtime: 136,
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    director: "Martin Scorsese",
    rating: 8.7,
    poster: "https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Goodfellas",
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his partners in crime.",
    runtime: 146,
  },
];

export const bookmarks = [
  {
    id: 1,
    userId: 1,
    movieId: 1,
    addedDate: "November 20, 2025",
  },
  {
    id: 2,
    userId: 1,
    movieId: 3,
    addedDate: "November 22, 2025",
  },
  {
    id: 3,
    userId: 1,
    movieId: 5,
    addedDate: "November 25, 2025",
  },
  {
    id: 4,
    userId: 1,
    movieId: 7,
    addedDate: "November 28, 2025",
  },
];

export const ratings = [
  {
    id: 1,
    userId: 1,
    movieId: 1,
    rating: 10,
    review: "Absolute masterpiece. One of the best films ever made.",
    ratedDate: "November 21, 2025",
  },
  {
    id: 2,
    userId: 1,
    movieId: 2,
    rating: 9,
    review: "A classic that set the standard for crime dramas.",
    ratedDate: "November 22, 2025",
  },
  {
    id: 3,
    userId: 1,
    movieId: 3,
    rating: 9.5,
    review:
      "The best superhero movie ever. Heath Ledger's performance is unforgettable.",
    ratedDate: "November 23, 2025",
  },
  {
    id: 4,
    userId: 1,
    movieId: 4,
    rating: 8.5,
    review: "Tarantino at his finest. Brilliant dialogue and storytelling.",
    ratedDate: "November 24, 2025",
  },
  {
    id: 5,
    userId: 1,
    movieId: 5,
    rating: 9,
    review: "Mind-bending and visually stunning. Nolan's best work.",
    ratedDate: "November 26, 2025",
  },
  {
    id: 6,
    userId: 1,
    movieId: 6,
    rating: 8,
    review: "Heartwarming and emotional. Tom Hanks is perfect.",
    ratedDate: "November 27, 2025",
  },
];
