import React, { useState } from 'react'
import { MovieCardProps } from './types'
import Link from 'next/link'
import Image from 'next/image'
import IMDBIcon from '@/public/assets/imdb-logo.svg'
import TomatoesIcon from '@/public/assets/tomato-icon.svg'
import { genreIdConverter } from "@/components/utils"
import FavoriteIcon from '@/public/assets/favorite-icon.svg'
import FavoriteActiveIcon from '@/public/assets/favorite-click-icon.svg'



const MovieCard = ({ movie, genres }: MovieCardProps) => {

    const img_url = 'https://image.tmdb.org/t/p/original'

    const [favorite, setFavorite] = useState(false)

    function clickFav() {
        setFavorite(!favorite)
    }


    return (
        <Link data-testid='movie-card' href={`/movies/${movie.id}`} className=' hover:scale-105 duration-300'>
            <div className='text-gray-900 relative z-0'>
                <button className='absolute top-4 right-4 z-10 scale-125 hover:scale-150 duration-300' onClick={(e => {
                    e.preventDefault()
                    e.stopPropagation()
                    clickFav()
                })}>
                    {favorite ? (
                        <Image src={FavoriteActiveIcon} alt='favorite active' />
                    ) : (
                        <Image src={FavoriteIcon} alt='favorite active' />
                    )}
                </button>
                <Image
                    data-testid='movie-poster'
                    className=' w-full h-auto mb-2'
                    width={250}
                    height={370}
                    src={`${img_url}${movie.poster_path}`}
                    alt="movie showcase" />
                <div className="flex flex-col gap-2">
                    <p data-testid='movie-release-date' className=" text-gray-400 leading-normal">
                        {movie.release_date}
                    </p>
                    <h3 data-testid='movie-title' className="font-bold text-lg leading-normal">
                        {movie.title}
                    </h3>
                    <div className="flex gap-12 justify-between">
                        <div className="flex gap-3">
                            <Image src={IMDBIcon} alt="imdb" />
                            <p>{movie.vote_average} / 10</p>
                        </div>
                        <div className="flex gap-3">
                            <Image src={TomatoesIcon} alt="rotten tomatoes" />
                            <p>88%</p>
                        </div>
                    </div>
                    <p
                        className=" text-gray-400"
                    >{genreIdConverter(movie.genre_ids, genres)}</p>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard