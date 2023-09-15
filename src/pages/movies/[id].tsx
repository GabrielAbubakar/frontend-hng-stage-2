import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import { MovieDetailsData } from "@/components/types";
import HomeIcon from '@/public/assets/home-icon.svg'
import CalendarIcon from '@/public/assets/calendar-icon.svg'
import ListIcon from '@/public/assets/list-icon.svg'
import LogoutIcon from '@/public/assets/logout-icon.svg'
import ProjectorIcon from '@/public/assets/projector-icon.svg'
import ShowIcon from '@/public/assets/show-icon.svg'
import TicketsIcon from '@/public/assets/tickets-icon.svg'
import MovieBoxLogo from '@/public/assets/movie-box-logo.svg'


const Movie = () => {
    const { id } = useRouter().query;
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

    const [movieDetails, setMovieDetails] = useState<MovieDetailsData>()
    const [loading, setLoading] = useState<boolean>(false)

    const img_url = 'https://image.tmdb.org/t/p/original'

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

    if (loading) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <main className="relative min-h-screen">
            <nav className="fixed py-12 border border-gray-400 h-full w-[35%] xl:w-[15%] rounded-r-[40px]">
                <div className="flex items-center gap-5 flex-1 px-4 mb-12">
                    <Image src={MovieBoxLogo} alt="movie box" />
                    <h1 className="font-bold text-lg md:text-2xl">MovieBox</h1>
                </div>

                <ul className="font-bold text-gray-700 flex flex-col gap-3">
                    <li className="w-full">
                        <Link href='/' className="flex gap-4 items-center py-5 px-7 hover:bg-rose-100 duration-300 ">
                            <Image src={HomeIcon} alt="home" />
                            Home
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link href='/' className="flex gap-4 items-center py-5 px-7 bg-rose-100 duration-300 border-r-4 border-rose-700">
                            <Image src={ProjectorIcon} alt="projector" />
                            Movies
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link href='/' className="flex gap-4 items-center py-5 px-7 hover:bg-rose-100 duration-300 ">
                            <Image src={ShowIcon} alt="tv show" />
                            TV Series
                        </Link>
                    </li>
                    <li className="w-full">
                        <Link href='/' className="flex gap-4 items-center py-5 px-7 hover:bg-rose-100 duration-300 ">
                            <Image src={CalendarIcon} alt="calendar" />
                            Upcoming
                        </Link>
                    </li>
                </ul>

                <div className="flex flex-col gap-3 mx-5 mt-8 px-5 py-10 rounded-3xl bg-rose-50 border border-rose-600">
                    <p className="font-bold">Play movie quizes and earn free tickets</p>
                    <p className=" text-xs">50k people are playing now</p>
                    <p className=" self-center text-xs text-rose-700 font-medium text-center px-6 py-2 bg-rose-300 rounded-xl">Start Playing</p>
                </div>
                <p className="w-full">
                    <Link href='/' className="flex gap-4 items-center py-5 px-7 hover:bg-rose-100 duration-300 ">
                        <Image src={LogoutIcon} alt="exit" />
                        Log out
                    </Link>
                </p>
                <div>

                </div>
            </nav>

            <div className="ml-[35%] xl:ml-[15%] ">
                sdfsdfkjh
            </div>
        </main>
    )
}

export default Movie