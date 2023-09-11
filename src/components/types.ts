
export interface MoviesData {
    page: 1,
    results: MovieData[]
}

export interface MovieData {
    id: number,
    title: string,
    overview: string,
    original_title: string,
    backdrop_path: string,
    poster_path: string,
    vote_average: number,
    release_date: string
}