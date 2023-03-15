import { useStateContext } from '../context/stateContext'
import Loader from './Loader'
import Result from './Result'
import Voice from './Voice'
import classes from '../style/Results.module.css'

const Results = () => {

  const { wordData, loading, searchedWord, audioSrc } = useStateContext()

  const { results, n_results } = wordData

  const isData = Object.keys(wordData).length > 0

  let returnedLang

  if (isData && n_results > 0) {
    returnedLang =  results[0].language
  }

  return (
    <>
      {
        loading ? <div className={classes.loader_container}><Loader /></div> : 
        isData && n_results === 0 ? <div className={classes.error_container}>sorry! no data was found</div> :
        isData && n_results > 0 &&
        <main className={classes.main} dir={returnedLang === 'ar' ? 'rtl' : 'ltr'}>
          <section className={classes.head}>
            <div className={classes.word_info}>
              <h1>{searchedWord}</h1>
              <p className={classes.subtitle}>{`available results: ${n_results}`}</p>
            </div>
            {
              audioSrc &&
              <Voice />
            }
          </section>
          <section>
            {
              results.map(result => (
                <Result key={result.id} data={result} lang={returnedLang} />
              ))
            }
          </section>
          <hr className='seperator' />
        </main>
      }   
    </>
  )
}

export default Results