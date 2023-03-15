import { createContext, useContext, useState, useEffect } from 'react'
import { checkWord } from '../lib/helpers'

const Context = createContext()

export const StateContext = ({ children }) => {

  /* --------------------- theme --------------------- */ 

  const [isDarkTheme, setIsDarkTheme] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedDarkTheme = localStorage.getItem('theme')
      if (typeof storedDarkTheme === 'string') setIsDarkTheme(storedDarkTheme === 'true')
      else if (matchMedia('(prefers-color-scheme: dark)').matches) setIsDarkTheme(true)
      else setIsDarkTheme(false)
    }
  }, [])

  useEffect(() => {
    document.body.setAttribute('data-dark-theme', isDarkTheme)
  }, [isDarkTheme])

  const handleToggleTheme = (e) => {
    setIsDarkTheme(e.target.checked)
    localStorage.setItem('theme', !isDarkTheme)
  }

  /* --------------------- lang --------------------- */ 

  const [lang, setLang] = useState('en-gb')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedLang = localStorage.getItem('lang')
      if (typeof storedLang === 'string') setLang(storedLang)
      else setLang('en-gb')
    }
  }, [])

  const handleLangChange = (e) => {
    setLang(e.target.value)
    localStorage.setItem('lang', e.target.value)
  }

  /* --------------------- search input --------------------- */ 

  const [toSearchWord, setToSearchWord] = useState('')
  const [wordError, setWordError] = useState(false)

  const [loading, setLoading] = useState(false)
  const [searchedWord, setSearchedWord] = useState('')
  const [wordData, setWordData] = useState({})

  const [audioSrc, setAudioSrc] = useState(undefined)

  const handleInputChange = (e) => {
    setToSearchWord(e.target.value)
  }

  const handleSearchForm = async (e) => {
    e.preventDefault()

    if (!checkWord(toSearchWord, lang)) {
      setWordError(true)
      setTimeout(() => {
        setWordError(false)
      }, 3000)
    }
    else {
      fetchDictionaryData(toSearchWord, lang)
    }
  }

  const fetchDictionaryData = async (word, lang) => {
    console.log(lang)
    console.log(word)
    try {
      setLoading(true)
      const dataToSendWord = { word, lang }
      const wordResponse = await fetch('/api/dictionary', {
        method: 'POST',
        body: JSON.stringify(dataToSendWord),
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json"
        }
      })
      const wordData = await wordResponse.json()
      setSearchedWord(word)
      fetchVoiceData(word, lang)
      setToSearchWord('')
      setWordData(wordData.data)
      setLoading(false)
    }
    catch(err) {
      console.log(err)
    }
  }

  const fetchVoiceData = async (word, lang) => {

    const reqUrl = 'https://voicerss-text-to-speech.p.rapidapi.com/'

    const response = await fetch(`${reqUrl}?key=${process.env.NEXT_PUBLIC_VOICE_RSS_API_KEY}&src=${word}&hl=${lang}&r=0&c=mp3&f=32khz_16bit_stereo`, {
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
      },
      responseType: 'arraybuffer'
    })

    const data = await response.blob()
    const url = URL.createObjectURL(data) 

    setAudioSrc(url)
  }


  /* --------------------- initial fetch --------------------- */ 

  useEffect(() => {
    const getInitialData = async () => {
      let lang
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedLang = localStorage.getItem('lang')
        if (typeof storedLang === 'string') lang = storedLang
        else lang = 'en-us'
      }
      const toSearchWord = lang === 'ar-sa' ? 'مرحبا' : lang === 'fr-fr' ? 'bonjour' : lang === 'de-de' ? 'hallo' : lang === 'es-es' ? 'hola' : 'hello' 

      fetchDictionaryData(toSearchWord, lang)
    }
    getInitialData()
  }, [])
  
  return (
    <Context.Provider value={{ isDarkTheme, handleToggleTheme, lang, handleLangChange, toSearchWord, handleInputChange, handleSearchForm, wordError, wordData, loading, searchedWord, audioSrc }}>
      { children }
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)