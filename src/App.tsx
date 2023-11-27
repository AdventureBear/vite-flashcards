//React Query
import { useQuery } from "react-query";

let decksURL = ""
let statsURL = ""
//Data
if (import.meta.env.MODE === "development") {
     decksURL = "http://localhost:3000/decks"
     statsURL = "http://localhost:3000/stats"
} else if (import.meta.env.MODE === "production") {
    decksURL = "https://my-json-server.typicode.com/adventurebear/vite-flashcards/decks"
    statsURL = "https://my-json-server.typicode.com/adventurebear/vite-flashcards/stats"
}
// const productionURLDecks = "https://my-json-server.typicode.com/adventurebear/vite-flashcards/decks"

//Style
import './App.css'

console.log(import.meta.env.MODE)
//components
import FlashcardApp from "./components/FlashcardApp.tsx";

function App() {

    //reactQuery, get all data
    const { isLoading, error,  data: allDecks  } =   useQuery(
        'getAllDecks', () =>
        fetch(decksURL).then(res =>
            res.json()
        )
    )

    const { isLoading: isLoadingStats, error: errorStats,  data: allStats  } =   useQuery(
        'getStats', () =>
            fetch(statsURL).then(res =>
                res.json()
            )
    )

    if (isLoading) return 'Loading...'
    if (isLoadingStats) return 'Loading stats...'
    if (error) return 'An error has occurred getting data: ' + error
    if (errorStats) return 'An error has occurred getting stats: ' + error

    return (
        <FlashcardApp
            decks={allDecks}
            stats={allStats}
        />
    )

}
export default App
