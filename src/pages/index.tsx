import Image from "next/image"
import Navbar from "@/components/navbar"
import { GetServerSideProps } from "next"
import { MoviesData } from "@/components/types"


export const getServerSideProps: GetServerSideProps = async (context) => {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=92acbcf971b9fdd0eff46dda90de9768')
    const { results } = await res.json()

    return {
        props: {
            results
        }
    }
}

const Home = ({ results }: MoviesData) => {

    const img_url = 'https://image.tmdb.org/t/p/original'
    const filteredResults = results.slice(0, 10)

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
                                <h3>{movie.title}</h3>
                            </div>
                        ))
                    }

                </div>
            </div>
        </main>
    )
}

export default Home