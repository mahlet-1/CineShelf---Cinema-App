# CineShelf Cinema Web

CineShelf is a responsive web app built with React, Vite, and Tailwind CSS for keeping track of and discovering movies and TV shows. It lets you browse what's trending, look up details on different titles, search through the TMDB database, and save things to a personal watchlist that stays put even if you close the tab.
### 🔗 Links
- **Live Demo:** [View Live Application]()

---

## Key Features

- **Browse & Trending**: Check out what's trending, look through popular movies and TV shows, and find top-rated picks.
- **Clean Navigation**: Smooth routing for both movies and series (`/movie/:id` and `/series/:id`) so every title opens the right page.
- **Persistent Watchlist & Alerts**: Save items to your personal watchlist—stored right in your browser—with quick pop-up alerts whenever you add or remove something.
- **Light & Dark Mode**: Switch between light and dark themes instantly, with your preference saved automatically.

## Tech Stack

- **React** (UI component library)
- **React Router DOM** (Handles page routing and navigation)
- **Tailwind CSS** (For styling and responsive design)
- **Vite** (Build tool and local dev server)
- **TMDB API** (Fetches all movie and TV show data)

## Project Structure

```text
cinema-app/
├── src/
│   ├── Context/
│   │   ├── WatchlistContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── NotificationContext.jsx
│   ├── Hooks/
│   │   ├── useMovies.js
│   │   └── useDebounce.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Browse.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── SearchResults.jsx
│   │   ├── Watchlist.jsx
│   │   └── NotFound.jsx
│   ├── Components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── movie/
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieRow.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── SkeletonCard.jsx
│   │   │   └── TrailerModal.jsx
│   │   └── ui/
│   │       ├── GenreFilter.jsx
│   │       ├── SearchInput.jsx
│   │       ├── RatingBadge.jsx
│   │       └── Toast.jsx
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── tailwind.config.js
└── package.json
```

## Getting Started Locally

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your computer.

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahlet-1/CineShelf---Cinema-App
   cd Cinema-App
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   ```bash
   VITE_TMDB_KEY=your_tmdb_api_key_here
   ```


4. **Boot up the local development server:**
   ```bash
   npm run dev
   ```

5. **Build the app for final production deployment:**
   ```bash
   npm run build
   ```