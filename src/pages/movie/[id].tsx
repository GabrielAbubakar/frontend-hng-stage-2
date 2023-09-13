import { useRouter } from "next/router"

const Movie = () => {
    const img_url = 'https://image.tmdb.org/t/p/original'
    const API_KEY = process.env.TMDB_API_KEY;

    const fetchMovie = async () => {
        const detailsfetch = fetch(`https://api.themoviedb.org/3/movie/968051?api_key=${API_KEY}`)
        const genresfetch = fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)

        try {
            const [res1, res2] = await Promise.all([detailsfetch, genresfetch])

            if (!res1.ok || !res2.ok) {
                throw new Error('Failed to fetch data from one or both endpoints')
            }

            const details = await res1.json()
            const genres = await res2.json()

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <main>

        </main>
    )
}

export default Movie