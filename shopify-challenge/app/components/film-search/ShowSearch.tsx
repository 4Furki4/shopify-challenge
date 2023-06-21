'use client'
import React, { useState } from 'react'
import SearchBar from '../search-bar/SearchBar'
import SearchedShows from '../searched-shows/SearchedShows'
import styles from './styles/css/ShowSearch.module.css'

export default function ShowSearch({ nominatedShowIds, setNominatedShowIds }:
    {
        nominatedShowIds: Array<string>
        setNominatedShowIds: React.Dispatch<React.SetStateAction<Array<string>>>
    }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [queryType, setQueryType] = useState<'movie' | 'series' | 'episode'>('movie')
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <SearchBar queryType={queryType} setQueryType={setQueryType} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <SearchedShows showType={queryType} nominatedShowIds={nominatedShowIds} setNominatedShowIds={setNominatedShowIds} searchQuery={searchQuery} />
            </div>
        </div>
    )
}
