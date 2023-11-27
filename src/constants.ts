
let DECKS_URL = ""
let STATS_URL = ""
//Data

if (import.meta.env.MODE === "development") {
    DECKS_URL = "http://localhost:3000/decks"
    STATS_URL = "http://localhost:3000/stats"
} else if (import.meta.env.MODE === "production") {
    DECKS_URL = "https://my-json-server.typicode.com/adventurebear/vite-flashcards/decks"
    STATS_URL = "https://my-json-server.typicode.com/adventurebear/vite-flashcards/stats"
}

export { DECKS_URL, STATS_URL}