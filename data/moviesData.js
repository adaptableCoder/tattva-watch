// Mock data for movies - in real app, this would come from an external API
export const moviesData = [
  {
    id: 1,
    title: "Dune: Part Two",
    year: "2024",
    genre: "Sci-Fi",
    rating: "8.7",
    poster: "/api/placeholder/300/450",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. As mythic forces collide, Paul must choose between the love of his life and the fate of the known universe. This epic continuation explores themes of power, prophecy, and the cost of leadership in Denis Villeneuve's stunning adaptation of Frank Herbert's masterpiece.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Josh Brolin", "Austin Butler"],
    duration: "166 min",
    popularity: 95
  },
  {
    id: 2,
    title: "Oppenheimer",
    year: "2023",
    genre: "Drama",
    rating: "8.4",
    poster: "/api/placeholder/300/450",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb. Christopher Nolan's biographical thriller explores the moral complexities and personal costs of creating the world's most destructive weapon, featuring stunning cinematography and a powerhouse performance by Cillian Murphy.",
    director: "Christopher Nolan",
    cast: ["Cillian Murphy", "Emily Blunt", "Robert Downey Jr.", "Matt Damon", "Florence Pugh"],
    duration: "180 min",
    popularity: 92
  },
  {
    id: 3,
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    genre: "Adventure",
    rating: "8.8",
    poster: "/api/placeholder/300/450",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must stay true to himself to save those he loves most.",
    director: "Joaquim Dos Santos",
    cast: ["Shameik Moore", "Hailee Steinfeld", "Brian Tyree Henry", "Luna Lauren Vélez", "Jake Johnson"],
    duration: "140 min",
    popularity: 89
  },
  {
    id: 4,
    title: "John Wick: Chapter 4",
    year: "2023",
    genre: "Action",
    rating: "7.8",
    poster: "/api/placeholder/300/450",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes. The stakes have never been higher in this adrenaline-fueled conclusion to the legendary assassin's journey.",
    director: "Chad Stahelski",
    cast: ["Keanu Reeves", "Donnie Yen", "Bill Skarsgård"],
    duration: "169 min",
    popularity: 85
  },
  {
    id: 5,
    title: "The Batman",
    year: "2022",
    genre: "Crime",
    rating: "7.8",
    poster: "/api/placeholder/300/450",
    description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
    director: "Matt Reeves",
    cast: ["Robert Pattinson", "Zoë Kravitz", "Jeffrey Wright"],
    duration: "176 min",
    popularity: 88
  },
  {
    id: 6,
    title: "Top Gun: Maverick",
    year: "2022",
    genre: "Action",
    rating: "8.3",
    poster: "/api/placeholder/300/450",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator.",
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly"],
    duration: "131 min",
    popularity: 93
  },
  {
    id: 7,
    title: "Everything Everywhere All at Once",
    year: "2022",
    genre: "Sci-Fi",
    rating: "8.1",
    poster: "/api/placeholder/300/450",
    description: "An aging Chinese immigrant is swept up in an insane adventure in which she alone can save the world.",
    director: "Daniels",
    cast: ["Michelle Yeoh", "Stephanie Hsu", "Ke Huy Quan"],
    duration: "139 min",
    popularity: 87
  },
  {
    id: 8,
    title: "No Time to Die",
    year: "2021",
    genre: "Action",
    rating: "7.3",
    poster: "/api/placeholder/300/450",
    description: "James Bond has left active service. His peace is short-lived when Felix Leiter asks for help.",
    director: "Cary Joji Fukunaga",
    cast: ["Daniel Craig", "Rami Malek", "Léa Seydoux"],
    duration: "163 min",
    popularity: 82
  },
  {
    id: 9,
    title: "The French Dispatch",
    year: "2021",
    genre: "Comedy",
    rating: "7.1",
    poster: "/api/placeholder/300/450",
    description: "A love letter to journalists set in an outpost of an American newspaper in a fictional French city.",
    director: "Wes Anderson",
    cast: ["Benicio del Toro", "Adrien Brody", "Tilda Swinton"],
    duration: "108 min",
    popularity: 75
  },
  {
    id: 10,
    title: "Blade Runner 2049",
    year: "2017",
    genre: "Sci-Fi",
    rating: "8.0",
    poster: "/api/placeholder/300/450",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard.",
    director: "Denis Villeneuve",
    cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"],
    duration: "164 min",
    popularity: 84
  },
  {
    id: 11,
    title: "Parasite",
    year: "2019",
    genre: "Thriller",
    rating: "8.6",
    poster: "/api/placeholder/300/450",
    description: "A poor family schemes to become employed by a wealthy family by infiltrating their household.",
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    duration: "132 min",
    popularity: 91
  },
  {
    id: 12,
    title: "Joker",
    year: "2019",
    genre: "Drama",
    rating: "8.4",
    poster: "/api/placeholder/300/450",
    description: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.",
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
    duration: "122 min",
    popularity: 90
  }
]

// Filter and sort utility functions
export const filterMovies = (movies, filters) => {
  const { selectedGenre, selectedYear, searchQuery } = filters
  
  return movies.filter(movie => {
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre
    const matchesYear = selectedYear === 'All' || movie.year === selectedYear
    const matchesSearch = searchQuery === '' || 
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.cast.some(actor => actor.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesGenre && matchesYear && matchesSearch
  })
}

export const sortMovies = (movies, sortBy) => {
  return [...movies].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return parseFloat(b.rating) - parseFloat(a.rating)
      case 'year':
        return parseInt(b.year) - parseInt(a.year)
      case 'title':
        return a.title.localeCompare(b.title)
      case 'popularity':
      default:
        return b.popularity - a.popularity
    }
  })
}
