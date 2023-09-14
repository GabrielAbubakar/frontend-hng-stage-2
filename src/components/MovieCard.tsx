import { MovieCardProps } from './types'
import Link from 'next/link'
import Image from 'next/image'
import IMDBIcon from '@/public/assets/imdb-logo.svg'
import TomatoesIcon from '@/public/assets/tomato-icon.svg'
import { genreIdConverter } from "@/components/utils"
import FavoriteIcon from '@/public/assets/favorite-icon.svg'



const MovieCard = ({ movie, genres }: MovieCardProps) => {

    const img_url = 'https://image.tmdb.org/t/p/original'


    return (
        <Link href={`/movies/${movie.id}`}>
            <div>
                <Image
                    width={250}
                    height={370}
                    src={`${img_url}${movie.poster_path}`}
                    alt="movie showcase" />
                <div className="flex flex-col gap-2">
                    <p className=" text-gray-400 leading-normal">
                        {movie.release_date}
                    </p>
                    <h3 className="font-bold text-lg leading-normal">
                        {movie.title}
                    </h3>
                    <div className="flex gap-12">
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