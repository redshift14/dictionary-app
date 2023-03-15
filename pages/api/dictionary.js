const handler = async (req, res) => {

  const { word, lang } = req.body

  const splittedLang = lang.split('-')[0]

  try {
    const url = 'https://lexicala1.p.rapidapi.com/search-entries'
    const response = await fetch(`${url}?text=${word}&language=${splittedLang}&analyzed=true`,{
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY,
        'X-RapidAPI-Host': 'lexicala1.p.rapidapi.com'
      }
    })
    const data = await response.json()
    return res.status(200).json({ data }) 
  }
  catch(err) {
    return res.status(400).json({ message: err.message }) 
  }
}

export default handler