import api from "./api"

export async function searchShow(movieTitle: string, type: "movie" | "series" | "episode") {
    if (movieTitle) {
        const response = await api.get<MovieSearchResponse>('', {
            params: {
                s: movieTitle,
                type
            }
        })
        return response.data
    }
}

export async function getShowDetails(imdbID: string) {
    const response = await api.get<any>('', {
        params: {
            i: imdbID
        }
    })
    return response.data
}

