import { useState, useEffect } from "react"

export const useFetch = (url, method = "GET") => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState(null)


    const postData = (postData) => {
        return fetch(url,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error));
    }


    const putData = (url, putData) => {
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


    const deleteData = (url) => {
        console.log("deleting data w/ fetch")
        return fetch(url, {
            method: "DELETE"
        })
            .then(res => res.json())
            .catch(error => console.error('Error:', error));
    }


    useEffect(() => {
        const controller = new AbortController()

        const fetchData = async (fetchOptions) => {
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
            } catch (err) {
                if (err.name === "AbortError") {
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