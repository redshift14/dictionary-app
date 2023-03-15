import { Analytics } from '@vercel/analytics/react'
import { StateContext } from '../context/stateContext'
import '../style/global.css'

const MyApp = ({ Component, pageProps }) => {
  
  return (
    <>
      <StateContext>
        <Component {...pageProps} />
      </StateContext>
      <Analytics />
    </>
  )
}

export default MyApp