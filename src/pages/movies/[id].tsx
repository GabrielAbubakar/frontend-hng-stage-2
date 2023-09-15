import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { MovieDetailsData } from "@/components/types";
import ListIcon from '@/public/assets/list-icon.svg'
import TicketsIcon from '@/public/assets/tickets-icon.svg'
import StarIcon from '@/public/assets/star-icon.svg'
import Sidebar from "@/components/Sidebar";


const Movie = () => {
    const { id } = useRouter().query;
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const [movieDetails, setMovieDetails] = useState<MovieDetailsData>()
    const [loading, setLoading] = useState<boolean>(false)

    const img_url = 'https://image.tmdb.org/t/p/original'

    // const dateConverter = (str: string) => {
    //     let newArr = str.split('-')
    //     return newArr[0]
    // }

    const dateConverter = (d: string) => {
        const date = new Date(d);
        const utc = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
        return utc;
    };

    useEffect(() => {

        const fetchMovie = async (id: any, apiKey: any) => {
            const detailsfetch = fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)

            try {
                setLoading(true)
                const res1 = await detailsfetch

                if (!res1.ok) {
                    setLoading(false)
                    throw new Error('Failed to fetch data from one or both endpoints')
                }

                const details = await res1.json()

                setMovieDetails(details)
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


    return (
        <main className="relative min-h-screen">
            <Sidebar />

            {
                movieDetails ? (
                    <div className=" lg:ml-[15%] p-8 text-xl">
                        <div style={{ backgroundImage: `url(${img_url + movieDetails?.backdrop_path}`, }}
                            className="bg-cover bg-center min-h-[50vh] rounded-3xl mb-8">
                        </div>
                        <div className=" flex justify-between mb-5">
                            <div className="flex gap-8 text-2xl font-medium flex-wrap">
                                <p data-testid='movie-title'>{movieDetails?.title}</p>
                                <p data-testid='movie-release-date'>{dateConverter(movieDetails?.release_date)}</p>
                                {/* <p data-testid='movie-release-date'>{dateConverter(movieDetails?.release_date)}</p> */}
                                <p data-testid='movie-runtime'>{movieDetails?.runtime} min</p>
                                <div className="flex gap-4 text-rose-700 text-sm">
                                    {
                                        movieDetails?.genres.map((genre, i) => (
                                            <p className="px-4 py-2 border border-rose-300 rounded-3xl" key={i}>{genre.name}</p>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Image src={StarIcon} alt="star" />
                                <p>{movieDetails.vote_average}</p>
                            </div>
                        </div>
                        <div className="flex gap-10">
                            <div className="text-xl flex flex-col gap-5 flex-[1]">
                                <p data-testid='movie-overview'>{movieDetails?.overview}</p>
                                <p>Director: <span className=" text-rose-700">Joseph Krasinski</span></p>
                                <p>Writers : <span className=" text-rose-700">Jim Cash, Jack Epps Jr, Peter Craig</span></p>
                                <p>Stars : <span className=" text-rose-700">Tom Cruise, Jennifer Connelly, Miles Teller</span></p>
                            </div>
                            <div className="flex-[.4] flex flex-col gap-5">
                                <a href="#" className=" bg-rose-800 text-white py-3 flex justify-center gap-2 rounded-2xl">
                                    <Image src={TicketsIcon} alt="tickets" />
                                    See Showtimes
                                </a>
                                <a href="#" className=" bg-rose-100 py-3 flex justify-center gap-2 rounded-2xl">
                                    <Image src={ListIcon} alt="list" />
                                    More Watch Options
                                </a>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <h3 className="lg:ml-[15%] p-8 text-xl">Loading...</h3>
                )
            }
        </main>
    )
}

export default Movie