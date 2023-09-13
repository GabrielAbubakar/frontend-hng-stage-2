import { GenreData } from "./types"

const genreIdConverter = (genreIds: number[], genres: GenreData[], page: string) => {
    let transformedArray: string[] = []

    genreIds.map(id => {
        genres.map(genre => {
            if (id == genre.id) {
                transformedArray.push(genre.name)
            }
        })
    })

    if (page == 'home') {
        return transformedArray.join(', ')
    } else if (page == 'details') {
        return transformedArray
    }
    // A function that convert the genre id array of a movie into a string of the actual genre divided by ','.
}

export { genreIdConverter }