import { getShowDetails } from '@/app/methods/shows'
import { useQueries } from '@tanstack/react-query'
import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Button, Progress, Spinner } from '@chakra-ui/react'
import styles from './style/css/NominatedShows.module.css'
import { Image } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function NominatedFilms({ nominatedShowIds, setNominatedShowIds }: {
    nominatedShowIds: Array<string>,
    setNominatedShowIds: React.Dispatch<React.SetStateAction<Array<string>>>
}) {
    const nominatedShows = useQueries({
        queries: nominatedShowIds.map((id) => ({
            queryKey: ['showDetails', id],
            queryFn: () => getShowDetails(id),
            staleTime: 1000 * 60 * 60 * 24 * 7 // 1 week
        }))
    })
    const router = useRouter()
    function handleNominate() {
        if (nominatedShows.length < 5) return
        router.push('/winner?winnerShowId=' + nominatedShows[Math.floor(Math.random() * nominatedShows.length)]?.data?.imdbID,
        )
        setNominatedShowIds([])
    }
    return (
        <div className={styles.container}>
            <Progress size={'lg'} borderRadius={'2xl'} hasStripe value={nominatedShows.length * 20} />
            <p>Nominated Shows <span>{nominatedShowIds.length} / 5</span></p>

            <ul className={styles.list}>
                {nominatedShows.length === 0 && <div>No nominated shows</div>}
                {nominatedShows.map((show) => (
                    <>
                        {show.isLoading && <Spinner style={{ marginInline: "auto" }} />}
                        <li key={show.data?.imdbID} className={styles["list-item"]}>
                            <Card>
                                <CardHeader>{show.data?.Title}</CardHeader>
                                <CardBody>
                                    <Image src={show.data?.Poster} alt={show.data?.Title} borderRadius='lg' />
                                </CardBody>
                                <CardFooter>
                                    <Button backgroundColor={"red.500"} onClick={() => setNominatedShowIds(nominatedShowIds.filter((id) => id !== show.data?.imdbID))}>Remove</Button>
                                </CardFooter>
                            </Card>
                        </li>
                    </>
                ))}
            </ul>
            <Button className={styles["nominate__button"]} style={{ width: "100%", marginInline: "auto", marginTop: "1rem" }}
                isDisabled={nominatedShows.length < 5} onClick={() => handleNominate()}>
                Submit Nominations
            </Button>
        </div>
    )
}
