import React, { useState } from 'react'
import { searchShow } from '../../methods/films'
import { useQuery } from '@tanstack/react-query'
import styles from './style/css/searched-films.module.css'
import { Img, Spinner, useToast } from '@chakra-ui/react'
export default function SearchedFilms({ searchQuery, setNominatedFilmIds, nominatedFilmIds, showType }:
    {
        searchQuery: string,
        setNominatedFilmIds: React.Dispatch<React.SetStateAction<Array<string>>>,
        nominatedFilmIds: Array<string>,
        showType: 'movie' | 'series' | 'episode'
    }) {
    const toast = useToast()
    function handleNominate(imdbID: string) {
        if (nominatedFilmIds.length >= 5) return
        if (nominatedFilmIds.includes(imdbID)) return
        setNominatedFilmIds([...nominatedFilmIds, imdbID])
        toast({
            title: 'Film Nominated.',
            description: "You can remove the film if you want",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }

    const { data, isLoading, error } = useQuery({
        queryKey: ['showQuery', searchQuery ?? '', showType],
        queryFn: () => searchShow(searchQuery, showType),
        staleTime: 1000 * 60 * 60 * 24 * 7 // 1 week
    })

    if (searchQuery === "") return (<div>{"Seems You haven't"}</div>)

    if (isLoading) return <Spinner style={{ position: 'absolute', top: "200%", left: "50%" }} />

    if (error) return <div>Something went wrong...</div>

    if (data?.Response === "False") return (<div>No results found</div>)

    const showTypeCamelCase = showType.slice(0, 1).toUpperCase() + showType.slice(1)

    return (
        <div>
            <p>
                {showTypeCamelCase} Results for {searchQuery}
            </p>

            <ul className={styles["searched-films-list"]}>
                {data?.Search?.filter((film) => film.Poster !== "N/A").sort((film1, film2) => parseInt(film2.Year) - parseInt(film1.Year))
                    .map((film: MovieSearch) => (
                        <li className={styles["searched-films-list-item"]} key={film.imdbID}>

                            <div className={styles["searched-film"]}>

                                <Img className={styles["searched-film__poster"]} src={film.Poster} alt="" />

                                <div className={styles["searched-film__body"]}>

                                    <div className={styles["searched-film__content"]}>

                                        <h2 className={styles["searched-film__title"]}>
                                            {film.Title}
                                        </h2>

                                        <p className='searched-film__year-type'>
                                            {film.Year} - {film.Type}
                                        </p>

                                    </div>

                                    <button disabled={
                                        nominatedFilmIds.length >= 5 ||
                                        nominatedFilmIds.includes(film.imdbID)
                                    } onClick={() => handleNominate(film.imdbID)} className={styles["searched-film__nominate-btn"]}>
                                        Nominate
                                    </button>
                                </div>

                            </div>

                        </li>
                    ))}
            </ul>
        </div>
    )
}
