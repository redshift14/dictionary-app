import { useState, useEffect } from 'react'
import { useStateContext } from '../context/stateContext'
import classes from '../style/Voice.module.css'

const Voice = () => {

  const { audioSrc} = useStateContext()
  
  const [playing, setPlaying] = useState(false)

  const audio = new Audio(audioSrc)
  
  const handleAudioPlay = () => {
    if (playing) {
      audio.pause()
    }
    else {
      audio.play()
    }
    setPlaying(v => v = !v)
  }

  useEffect(() => {
    const handleEnd = () => setPlaying(false)
    audio.addEventListener('ended', handleEnd)
  }, [playing, audio])

  return (
    <>    
      <button className={classes.pause_play_btn} onClick={handleAudioPlay}>
        {
          playing ? 
          <i className={classes.gg_play_pause}></i> : 
          <i className={classes.gg_play_button}></i>
        }
      </button>
    </>
  )
}

export default Voice