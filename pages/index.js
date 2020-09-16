import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ restaurants }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Charter/Spectrum Code Challenge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Charter/Spectrum Code Challenge</h2>

      <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </ul>

      

      <footer className={styles.footer}>
       
          Conner Vick 2020
      
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
    headers: {
    Authorization: 'Api-Key q3MNxtfep8Gt',
    },
   });
  const restaurants = await res.json()
  console.log(restaurants)
  return {
    props: {
      restaurants,
    },
  }
}

