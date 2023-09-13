import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"
import Navbar from "@/components/navbar"
import { GetServerSideProps } from "next"
import { HomePropsData } from "@/components/types"
import { genreIdConverter } from "@/components/utils"
import PlayIcon from '@/public/assets/play-icon.svg'
import IMDBIcon from '@/public/assets/imdb-logo.svg'
import TomatoesIcon from '@/public/assets/tomato-icon.svg'


export const getServerSideProps: GetServerSideProps = async (context) => {

    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const random = Math.floor(Math.random() * 20)

    const fetchTopMovies = fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
    const fetchGenres = fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    const fetchTrending = fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)

    try {
        const [res1, res2, res3] = await Promise.all([fetchTopMovies, fetchGenres, fetchTrending])

        if (!res1.ok || !res2.ok || !res3.ok) {
            throw new Error('Failed to fetch data from one or multiple endpoints')
        }

        const topMovies = await res1.json()
        const genres = await res2.json()
        const popular = await res3.json()

        return {
            props: {
                topMovies: topMovies.results,
                genres: genres.genres,
                popular: popular.results,
                random
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error);

        return {
            props: {
                topMovies: null,
                genres: null,
                popular: null,
                random
            },
        }
    }
}

const Home = ({ topMovies, genres, popular, random }: HomePropsData) => {

    const img_url = 'https://image.tmdb.org/t/p/original'
    const filteredResults = topMovies.slice(0, 10)

    return (
        <>
            <Head>
                <title>HNG Frontend Task 2</title>
            </Head>
            <main>
                <div
                    style={{ backgroundImage: `url(${img_url + popular[random].backdrop_path}`, }}
                    className="min-h-[90vh] bg-cover bg-center text-white">

                    <Navbar />

                    <div className="max-w-container-lg mx-auto">
                        <div className="w-[40%] flex flex-col gap-4 mt-28">
                            <h1 className=" text-[3rem] font-bold">{popular[random].title}</h1>
                            <div className="flex gap-12">
                                <div className="flex gap-3">
                                    <Image src={IMDBIcon} alt="imdb" />
                                    <p>{popular[random].vote_average} / 10</p>
                                </div>
                                <div className="flex gap-3">
                                    <Image src={TomatoesIcon} alt="rotten tomatoes" />
                                    <p>88%</p>
                                </div>
                            </div>
                            <p className="text-sm">{popular[random].overview}</p>
                            <button className="text-sm uppercase flex gap-2 bg-rose-700 px-4 py-1 rounded-md self-start font-bold leading-6">
                                <Image src={PlayIcon} alt="play button" />
                                <p>Watch Trailer</p>
                            </button>
                        </div>
                    </div>
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
                                    <p>{genreIdConverter(movie.genre_ids, genres)}</p>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </main >
        </>
    )
}

export default Home