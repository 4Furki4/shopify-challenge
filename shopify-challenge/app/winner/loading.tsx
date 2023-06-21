"use client"
import { Spinner } from '@chakra-ui/react'
import React from 'react'
import styles from './style/css/winner.module.css'

export default function WinnerLoading() {
    return (
        <div className={styles.loading}>
            <Spinner className={styles.loading}
                size={"xl"}
            />
        </div>
    )
}
