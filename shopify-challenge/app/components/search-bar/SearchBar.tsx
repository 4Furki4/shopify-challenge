import React from 'react'
import styles from './style/css/search-bar.module.css'
import { Input, Select } from '@chakra-ui/react'
export default function SearchBar({ searchQuery, setSearchQuery, queryType, setQueryType }: {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    queryType: 'movie' | 'series' | 'episode',
    setQueryType: React.Dispatch<React.SetStateAction<'movie' | 'series' | 'episode'>>
}) {
    return (
        <form action="" className={styles["search-form"]}>
            <Input
                variant={'filled'}
                className={styles["search-form__input"]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                name="search"
                id="search"
                placeholder={`search for ${queryType}`} />
            <Select value={queryType} onChange={(e) => setQueryType(e.target.value as "movie" || "series" || "episode")} variant={'filled'}>
                <option value="movie">Movie</option>
                <option value="series">Series</option>
                <option value="episode">Episode</option>
            </Select>
        </form>
    )
}
