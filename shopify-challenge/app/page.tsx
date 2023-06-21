'use client'
import { useState } from "react";
import FilmSearch from "./components/film-search/ShowSearch";
import NominatedShows from "./components/nominated-shows/NominatedShows";
import styles from './style/css/style.module.css'

export default function Home() {
  const [nominatedShowIds, setNominatedShowIds] = useState(Array<string>)
  return (
    <main className={styles.main}>

      <section className={styles["film-search"]}>
        <FilmSearch nominatedShowIds={nominatedShowIds} setNominatedShowIds={setNominatedShowIds} />
      </section>

      <section className={styles.section}>
        <NominatedShows nominatedShowIds={nominatedShowIds} setNominatedShowIds={setNominatedShowIds} />
      </section>

    </main>
  )
}
