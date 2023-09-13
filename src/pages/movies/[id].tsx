import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { GenreData, MovieData } from "@/components/types";

const Movie = () => {
    const { id } = useRouter().query;
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const [genres, setGenres] = useState<GenreData[]>()
    const [movieDetails, setMovieDetails] = useState<MovieData>()
    const [loading, setLoading] = useState<boolean>(false)


    const img_url = 'https://image.tmdb.org/t/p/original'



    useEffect(() => {

        const fetchMovie = async (id: any, apiKey: any) => {
            const detailsfetch = fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            const genresfetch = fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)

            try {
                setLoading(true)
                const [res1, res2] = await Promise.all([detailsfetch, genresfetch])

                if (!res1.ok || !res2.ok) {
                    throw new Error('Failed to fetch data from one or both endpoints')
                }

                const details = await res1.json()
                const genres = await res2.json()

                setMovieDetails(details)
                setGenres(genres)
                setLoading(false)
                console.log('Fetch Successful')

            } catch (error) {
                setLoading(false)
                console.log(error);
            }

        }

        if (id && API_KEY) { // make sure id and api key are available before fetching
            fetchMovie(id, API_KEY)
        }

    }, [id, API_KEY])


    if (loading) {
        return <h1>Loading...</h1>
    }

    return (
        <main>
            {id}
        </main>
    )
}

export default Movie