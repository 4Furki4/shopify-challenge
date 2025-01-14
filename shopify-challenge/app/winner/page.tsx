
'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getShowDetails } from '../methods/shows'
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Image, Spinner, Stack, Text, Wrap } from '@chakra-ui/react'
import styles from './style/css/winner.module.css'
import Link from 'next/link'


export default function Winner({ searchParams }: any) {
    let { data, isLoading, isError } = useQuery<showDetails>({
        queryKey: ['showDetails', searchParams.winnerShowId],
        queryFn: () => getShowDetails(searchParams.winnerShowId),
    })
    if (isError) return <div>Error</div>
    return (
        <div className={styles["card--wrapper"]}>
            <Card maxW={'lg'} >
                <CardHeader>
                    <Heading textAlign={"center"} size='lg'>Winner</Heading>
                </CardHeader>
                <CardBody>
                    <Image src={data?.Poster} alt={data?.Title} borderRadius='lg' w={"xs"} marginInline={"auto"} />
                    <Stack mt='6' spacing='3' px={2}>
                        <Heading textAlign={"center"} size='lg'>{data?.Title}</Heading>
                        <Text>
                            {data?.Plot}
                        </Text>
                    </Stack>
                </CardBody>
                <CardFooter className={styles["card__footer"]}>
                    <Stack className={styles["card__footer__ratings"]} direction='row' h='full'>
                        <Divider orientation='vertical' />
                        {
                            data?.Ratings.map((rating) => {
                                return (
                                    <>
                                        <Text>
                                            {rating?.Source === "Internet Movie Database" ? "IMDb" : rating?.Source}: {rating?.Value}
                                        </Text>
                                        <Divider orientation='vertical'></Divider>
                                    </>)
                            })
                        }
                    </Stack>
                    <Link href={'/'}>
                        <Button px={10} backgroundColor={"red.400"}>
                            Reset
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}
