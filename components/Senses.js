import classes from '../style/Senses.module.css'

const Senses = ({ data, lang }) => {

  const { definition, examples, compositional_phrases, synonyms, antonyms } = data

  return (
    <li className={lang === 'ar' ? `${classes.main} ${classes.main_ar}` : classes.main}>
      <div className={classes.content}>
        {
          definition !== undefined && 
          <p className={classes.definition}>{definition}</p>
        }
        {
          examples !== undefined &&
          <div className={classes.examples}>
            {
              examples.map((example, index) => (
                <p key={index} className={classes.example}>{`"${example.text}"`}</p>
              ))
            }
          </div>
        }
        {
          compositional_phrases !== undefined &&
          <ul className={classes.phrases_list}>
            <li className={classes.phrases_title}>compositional phrases/phrase</li>
            {
              compositional_phrases.map((phrase, index) => {
                const { definition, examples, text } = phrase
                return (
                  <li className={lang === 'ar' ? `${classes.phrases_list_item} ${classes.phrases_list_item_ar}` : classes.phrases_list_item} key={index}>
                    <div className={classes.inner_content}>
                      <div className={classes.phrase_head}>
                        { 
                          text !== undefined && definition !== undefined &&
                          <p className={classes.text}>{`${text} - ${definition}`}</p>
                        }
                        {
                          text !== undefined && definition === undefined &&
                          <p className={classes.text}>{text}</p>
                        }
                        {
                          definition !== undefined && text === undefined &&
                          <p className={classes.definition}>{'means: '}{definition}</p>
                        }
                      </div>
                      {
                        examples !== undefined &&
                        <div className={classes.examples}>
                          {
                            examples.map((example, index) => (
                              <p key={index} className={classes.example}>{`"${example.text}"`}</p>
                            ))
                          }
                        </div>
                      }
                    </div>
                  </li>
                )
              })
            }
          </ul>
        }
        {
          synonyms !== undefined &&
          <div className={classes.non_list}>
            <p className={classes.non_list_title}>synonyms</p>
            <div className={classes.synonyms}>
              {
                synonyms.map((synonym, index) => (
                  <p key={index}>{synonym}</p>
                ))
              }
            </div>
          </div>
        }
        {
          antonyms !== undefined &&
          <div className={classes.non_list}>
            <p className={classes.non_list_title}>antonyms</p>
            <div className={classes.antonyms}>
              {
                antonyms.map((antonym, index) => (
                  <p key={index}>{antonym}</p>
                ))
              }
            </div>
          </div>
        }
      </div>
    </li>
  )
}

export default Senses