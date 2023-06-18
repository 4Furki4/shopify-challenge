import { getFilmDetails } from '@/app/methods/films'
import { useQueries } from '@tanstack/react-query'
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button, Progress, Spinner } from '@chakra-ui/react'
import styles from './style/css/NominatedFilms.module.css'
import { Image } from '@chakra-ui/react'
export default function NominatedFilms({ nominatedFilmIds, setNominatedFilmIds }: {
    nominatedFilmIds: Array<string>,
    setNominatedFilmIds: React.Dispatch<React.SetStateAction<Array<string>>>
}) {
    const nominatedFilms = useQueries({
        queries: nominatedFilmIds.map((id) => ({
            queryKey: ['showDetails', id],
            queryFn: () => getFilmDetails(id),
            staleTime: 1000 * 60 * 60 * 24 * 7 // 1 week
        }))
    })
    return (
        <div className={styles.container}>
            <Progress size={'lg'} borderRadius={'2xl'} hasStripe value={nominatedFilms.length * 20} />
            <p>Nominated Films <span>{nominatedFilmIds.length} / 5</span></p>

            <ul className={styles.list}>
                {nominatedFilms.length === 0 && <div>No nominated films</div>}
                {nominatedFilms.map((film) => (
                    <>
                        {film.isLoading && <Spinner color='pink' size={'xl'} style={{ position: "fixed", inset: 0, margin: "auto", transform: "translate(50%, 50%)" }} />}
                        <li key={film.data?.imdbID} className={styles["list-item"]}>
                            <Card>
                                <CardHeader>{film.data?.Title}</CardHeader>
                                <CardBody>
                                    <Image src={film.data?.Poster} alt={film.data?.Title} borderRadius='lg' />
                                </CardBody>
                                <CardFooter>
                                    <Button backgroundColor={"red.500"} onClick={() => setNominatedFilmIds(nominatedFilmIds.filter((id) => id !== film.data?.imdbID))}>Remove</Button>
                                </CardFooter>
                            </Card>
                        </li>
                    </>
                ))}
            </ul>
            <Button style={{ width: "100%", marginTop: "1rem" }} disabled={nominatedFilms.length < 5} onClick={() => { }}>
                Submit Nominations
            </Button>
        </div>
    )
}
