import Senses from './Senses'
import classes from '../style/Result.module.css'

const Result = ({ data, lang }) => {

  const { headword, senses } = data

  const { pos, inflections, text, pronunciation } = headword
  
  return (
    <>
      {
        pos !== undefined &&
        <div className={classes.main}>
          <p className={lang === 'ar' ? `${classes.pos} ${classes.pos_ar}` : classes.pos }>{pos}</p>
          <div className={classes.text_pronunciation}>
            <p className={classes.text}>{text}</p>
            {
              pronunciation !== undefined &&
              <p className={classes.pronunciation}>{pronunciation.value}</p>
            }
          </div>
          {
            inflections !== undefined &&
            <div className={classes.inflections}>
              <p className={classes.title}>inflections</p>
              {
                inflections.map((inflection, index) => (
                  <p key={index}>{inflection.text}</p>
                ))
              }
            </div>
          }
          <p className={classes.senses_title}>meanings</p>
          <ul className={classes.senses_list}>
            {
              senses.map(sense => (
                <Senses key={sense.id} data={sense} lang={lang} />
              ))
            }
          </ul>
        </div>
      }
    </>
  )
}

export default Result