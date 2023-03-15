import Navbar from '../components/Navbar'
import Results from '../components/Results'
import Head from 'next/head'

const App = () => {

  return (
    <>
      <Head>
        <title>Dictionary App</title>
        <meta name='description' content='Dictionary web app that supports multiple languages and a text to speech' />
        <meta name='keywords' content='dictionary, languages, text-to-speech' />
        <meta httpEquiv="Content-Language" content='en' />
        <meta charSet="UTF-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <Navbar />
      <Results />
    </>
  )
}

export default App