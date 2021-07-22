import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Player from '../component/player'
export default function Home() {
  return (
    <div className={styles.container}>
      <Player playerUrl="https://v.kr.kollus.com/fkbpVQV4?enable_initialize_focus=true"></Player>
    </div>
  )
}
