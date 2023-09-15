import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { GenreData, MovieData } from "@/components/types";
import MovieCard from "@/components/MovieCard";

const Search = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [movies, setMovies] = useState<MovieData[]>()
    const [genres, setGenres] = useState<GenreData[]>()
    const { searchTerm } = useRouter().query
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    useEffect(() => {

        const fetchMovieDetails = async () => {
            const detailsFetch = fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`)
            const fetchGenres = fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)


            try {
                setLoading(true)
                const [res1, res2] = await Promise.all([detailsFetch, fetchGenres])

                if (!res1.ok || !res2.ok) {
                    setLoading(false)
                    throw new Error('Failed to fetch data from the endpoint')
                }

                const { results } = await res1.json()
                const { genres } = await res2.json()
                setMovies(results)
                setGenres(genres)
                setLoading(false)
                console.log('Fetch Successful')
            } catch (error) {
                setLoading(false)
                console.log(error)
            }
        }

        fetchMovieDetails()
    }, [searchTerm, API_KEY])


    return (
        <main>
            <Navbar />

            <div className="max-w-container-lg mx-auto pt-16 px-6 xl:px-0">
                <h1 className="text-black font-bold text-2xl lg:text-[2.5rem] mb-10">
                    Search Results for <span className=" text-rose-700">{searchTerm}</span>
                </h1>
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 justify-between gap-16">
                            {
                                movies && genres && movies.map((movie, i) => (
                                    <MovieCard key={i} movie={movie} genres={genres} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </main>
    )
}

export default Search;