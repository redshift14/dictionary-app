import Image from 'next/image'

import { useStateContext } from '../context/stateContext'
import bookIcon from '../public/icons/book.png'

const Navbar = () => {

  const { isDarkTheme, handleToggleTheme, handleLangChange, lang, toSearchWord, handleInputChange, handleSearchForm, wordError } = useStateContext()

  const placeholderText = lang === 'ar-sa' ? 'arabic' : lang === 'fr-fr' ? 'french' : lang === 'de-de' ? 'german' : lang === 'es-es' ? 'spanish' : 'english' 

  return (
    <nav className='nav'>
      <div className='top-nav'>
        <div className='book-icon-container'>
          <Image src={bookIcon} priority alt='book-icon' />
        </div>
        <select onChange={handleLangChange} value={lang} name='switch-language'>
          <option value='en-gb'>English</option>
          <option value='ar-sa'>Arabic</option>
          <option value='fr-fr'>French</option>
          <option value='de-de'>German</option>
          <option value='es-es'>Spanish</option>
        </select>
        <div className='toggle-switch'>
          <label className='switch-label'>
            <label className='switch'>
              <input type='checkbox' title='theme-changer' className='checkbox' checked={isDarkTheme} onChange={handleToggleTheme}  />
              <span className='slider'></span>
            </label>
          </label>
        </div>  
      </div>
      <div className='input-container'>
        <form onSubmit={handleSearchForm}>
          <input 
            type='search' 
            placeholder={`Search for a word in ${placeholderText} ...`}
            onChange={handleInputChange} 
            value={toSearchWord} 
            style={wordError ? { outline: '3px solid red' } : { outline: 'none' }} 
          />
        </form>
      </div>
    </nav>
  )
}

export default Navbar