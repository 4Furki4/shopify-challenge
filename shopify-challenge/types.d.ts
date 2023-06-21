type MovieSearchResponse = {
    Search?: MovieSearch[],
    totalResults?: string,
    Response: string,
    Error?: string
}


type MovieSearch = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}
type showDetails = {
    Title: string,
    Year: string,
    Rated: string,
    Released: string,
    Runtime: string,
    Genre: string,
    Director: string,
    Writer: string,
    Actors: string,
    Plot: string,
    Language: string,
    Country: string,
    Awards: string,
    Poster: string,
    Ratings: Rating[],
}
type Rating = {
    Source: string,
    Value: string
}