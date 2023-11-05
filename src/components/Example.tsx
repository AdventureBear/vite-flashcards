import {useQuery} from "react-query";

function Example() {
    const { isLoading, error, data } = useQuery('cardDecData', () =>
        fetch('http://localhost:3000/deck').then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error

    return (
        <div>
            <h1>{data.length}</h1>
        </div>
)
}

export default Example