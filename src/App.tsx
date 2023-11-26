//React Query
import { useQuery } from "react-query";

//Data
const URL = "http://localhost:3000/decks"

//Style
import './App.css'


//components
import FlashcardApp from "./components/FlashcardApp.tsx";

function App() {

    //reactQuery, get all data
    const { isLoading, error,  data: allDecks  } =   useQuery(
        'getAllDecks', () =>
        fetch(URL).then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error

    return (
        <FlashcardApp decks={allDecks} />
    )

}
export default App
