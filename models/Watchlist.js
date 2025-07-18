import mongoose from 'mongoose'

const WatchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  movieId: {
    type: Number,
    required: true
  },
  movieData: {
    title: String,
    year: String,
    poster: String,
    rating: String,
    description: String,
    genre: String,
    director: String,
    duration: String
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Create compound index to prevent duplicate entries
WatchlistSchema.index({ userId: 1, movieId: 1 }, { unique: true })

export default mongoose.models.Watchlist || mongoose.model('Watchlist', WatchlistSchema)