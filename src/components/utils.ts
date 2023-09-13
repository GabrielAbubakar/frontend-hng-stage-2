import { GenreData } from "./types"

const genreIdConverter = (genreIds: number[], genres: GenreData[]) => {
    let transformedArray: string[] = []

    genreIds.map(id => {
        genres.map(genre => {
            if (id == genre.id) {
                transformedArray.push(genre.name)
            }
        })
    })

    return transformedArray.join(', ')
    // A function that convert the genre id array of a movie into a string of the actual genre divided by ',' or just return an array of all genre
}

export { genreIdConverter }