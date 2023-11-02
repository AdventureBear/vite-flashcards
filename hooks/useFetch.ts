import { useState, useEffect } from "react"


interface Card {
    question: string;
    answer: string;
}

export const useFetch = (url: string, method: string = "GET") => {
    const [data, setData] = useState<Card[] | null>(null)
    const [isPending, setIsPending] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [options, setOptions] = useState<object | null>(null)


    const postData = (postData: object) => {
        setOptions({
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
    }


    const putData = (url: string, putData: object) => {
        return fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(putData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error));
    }


    const deleteData = (url: string) => {
        console.log("deleting data w/ fetch")
        return fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error));
    }


    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async (fetchOptions?: object) => {
            setIsPending(true)

            try {
                const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
                if(!res.ok) {
                    throw new Error(res.statusText)
                }
                const data = await res.json()

                setIsPending(false)
                setData(data)
                setError(null)
            } catch (err ) {
                if ((err as Error).name === "AbortError") {
                    console.log("the fetch was aborted")
                } else {
                    setIsPending(false)
                    setError('Could not fetch the data')
                }
            }
        }

        // invoke the function
        if (method === "GET") {
            fetchData()
        }
        if ((method === "POST" || method === "PUT" || method === "DELETE") && options) {
            fetchData(options)
        }


        return () => {
            controller.abort()
        }

    }, [url, method, options])

    return { data, isPending, error, postData, putData, deleteData }
}