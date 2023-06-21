import React, { useState } from 'react'
import { searchShow } from '../../methods/shows'
import { useQuery } from '@tanstack/react-query'
import styles from './style/css/searched-shows.module.css'
import { Img, Spinner, useToast } from '@chakra-ui/react'
export default function SearchedShows({ searchQuery, setNominatedShowIds, nominatedShowIds, showType }:
    {
        searchQuery: string,
        setNominatedShowIds: React.Dispatch<React.SetStateAction<Array<string>>>,
        nominatedShowIds: Array<string>,
        showType: 'movie' | 'series' | 'episode'
    }) {
    const toast = useToast()
    function handleNominate(imdbID: string) {
        if (nominatedShowIds.length >= 5) return
        if (nominatedShowIds.includes(imdbID)) return
        setNominatedShowIds([...nominatedShowIds, imdbID])
        toast({
            title: 'show Nominated.',
            description: "You can remove the show if you want",
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

    if (searchQuery === "") return (<div>{"Seems You Haven't Searched any Shows"}</div>)

    if (isLoading) return <Spinner style={{ position: 'absolute', top: "200%", left: "50%" }} />

    if (error) return <div>Something went wrong...</div>

    if (data?.Response === "False") return (<div>No results found</div>)

    const showTypeCamelCase = showType.slice(0, 1).toUpperCase() + showType.slice(1)

    return (
        <div>
            <p>
                {showTypeCamelCase} Results for {searchQuery}
            </p>

            <ul className={styles["searched-shows-list"]}>
                {data?.Search?.filter((show) => show.Poster !== "N/A").sort((show1, show2) => parseInt(show2.Year) - parseInt(show1.Year))
                    .map((show: MovieSearch) => (
                        <li className={styles["searched-shows-list-item"]} key={show.imdbID}>

                            <div className={styles["searched-show"]}>

                                <Img className={styles["searched-show__poster"]} src={show.Poster} alt="" />

                                <div className={styles["searched-show__body"]}>

                                    <div className={styles["searched-show__content"]}>

                                        <h2 className={styles["searched-show__title"]}>
                                            {show.Title}
                                        </h2>

                                        <p className='searched-show__year-type'>
                                            {show.Year} - {show.Type}
                                        </p>

                                    </div>

                                    <button disabled={
                                        nominatedShowIds.length >= 5 ||
                                        nominatedShowIds.includes(show.imdbID)
                                    } onClick={() => handleNominate(show.imdbID)} className={styles["searched-show__nominate-btn"]}>
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
