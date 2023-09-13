import { useState } from "react"
import Image from "next/image"
import Navbar from "@/components/navbar"
import { GetServerSideProps } from "next"
import { HomePropsData } from "@/components/types"
import { genreIdConverter } from "@/components/utils"


export const getServerSideProps: GetServerSideProps = async (context) => {

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const fetchTopMovies = fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
    const fetchGenres = fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)

    try {
        const [res1, res2] = await Promise.all([fetchTopMovies, fetchGenres])

        if (!res1.ok || !res2.ok) {
            throw new Error('Failed to fetch data from one or both endpoints')
        }

        const topMovies = await res1.json()
        const genres = await res2.json()

        return {
            props: {
                topMovies: topMovies.results,
                genres: genres.genres
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: { topMovies: null, genres: null },
        }
    }
}

const Home = ({ topMovies, genres }: HomePropsData) => {
    const [loading, setLoading] = useState<boolean>(false)

    const img_url = 'https://image.tmdb.org/t/p/original'
    const filteredResults = topMovies.slice(0, 10)

    return (
        <main>
            <Navbar />

            <div>
                <h1>{filteredResults[0].title}</h1>
                <div>
                    <Image
                        width={1000}
                        height={1000}
                        src={`${img_url}${filteredResults[0].backdrop_path}`}
                        priority
                        alt="backdrop showcase" />
                </div>

                <div>
                    <div></div>
                    <p></p>
                    <p></p>
                </div>
                <p>{filteredResults[0].overview}</p>
                <button>Watch Trailer</button>
            </div>

            <div>
                <div>
                    <h2>Featured Movies</h2>
                    <a href="#">See More</a>
                </div>

                <div>
                    {
                        filteredResults && filteredResults.map((movie, i) => (
                            <div key={i}>
                                <Image
                                    width={250}
                                    height={370}
                                    src={`${img_url}${movie.poster_path}`}
                                    alt="movie showcase" />
                                <h3>{movie.title}</h3>
                                <p>{genreIdConverter(movie.genre_ids, genres, 'home')}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </main>
    )
}

export default Home