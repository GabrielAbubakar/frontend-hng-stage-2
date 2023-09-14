
export interface MoviesData {
    page: number,
    results: MovieData[]
}

export interface MovieData {
    id: number,
    title: string,
    overview: string,
    genre_ids: number[],
    original_title: string,
    backdrop_path: string,
    poster_path: string,
    vote_average: number,
    release_date: string
}

export interface MovieDetailsData {
    id: number,
    title: string,
    overview: string,
    genres: GenreData[],
    original_title: string,
    backdrop_path: string,
    poster_path: string,
    vote_average: number,
    release_date: string
}

export interface GenresData {
    genres: GenreData[]
}

export interface GenreData {
    id: number,
    name: string
}

export interface HomePropsData {
    topMovies: MovieData[],
    genres: GenreData[],
    popular: MovieData[],
    random: number
}

export interface MovieCardProps {
    movie: MovieData,
    genres: GenreData[]
}