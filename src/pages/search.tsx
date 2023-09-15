import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { MovieData } from "@/components/types";

const Search = () => {
    const [movies, setMovies] = useState<MovieData[]>()
    const { searchTerm } = useRouter().query
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    useEffect(() => {

        const fetchMovieDetails = async () => {
            const detailsFetch = fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`)

            try {
                const res = await detailsFetch

                if (!res.ok) {
                    throw new Error('Failed to fetch data from the endpoint')
                }

                const { results } = await res.json()
                setMovies(results)

                console.log('Fetch Successful')
            } catch (error) {
                console.log(error)
            }
        }

        fetchMovieDetails()
    }, [searchTerm, API_KEY])


    return (
        <main>
            <Navbar />
        </main>
    )
}

export default Search;