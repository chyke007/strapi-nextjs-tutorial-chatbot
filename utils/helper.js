const baseUrl = process.env.BASE_URL || 'localhost:1337'

export const createMarkup = (text) => {
  return {__html: text};
}

export const tranformInterchanges = (interchanges, initial = false) => {
  let initialText = initial ? `<b>Welcome to my page, glad to have you here 🥰</b> <br/>
 Tell me what you would like to know: <br/> <br/> `: ''
  
  interchanges.map((e, i) => {
      initialText += `${(i+1)}. ${e.question} <br /> <br />`
  })

  return initialText
}

export const searchInterchange = (interchanges, question) => {
  let result = interchanges.find(e => e.question.toLowerCase().includes(question.toLowerCase()))
  if(result) return result.answer
  return `Cant seem to understand your question, please try again 😔<br><br>
    Here are the options again: <br/> <br/>
    ${tranformInterchanges(interchanges)}
  `
}


export const showBotTyping = async (setInterchange, prevState, setAllow) => {

  scrollDown()
  await new Promise(resolve => setTimeout(resolve, 1000));
  setInterchange([...prevState, {
    owner: false,
    text: 'Bot Assistant is typing.'
  }])
  scrollDown()

  await new Promise(resolve => setTimeout(resolve, 1000));
  setInterchange([...prevState, {
    owner: false,
    text: 'Bot Assistant is typing..'
  }])
  scrollDown()

  await new Promise(resolve => setTimeout(resolve, 1000));
  setInterchange([...prevState, {
    owner: false,
    text: 'Bot Assistant is typing...'
  }])
  scrollDown()
  


  await new Promise(resolve => setTimeout(resolve, 1000));
  setAllow(true)
  scrollDown()
  
}

export const getBotAnswer = async (interchanges, setInterchange, question, prevState, setAllow) => {
  await showBotTyping(setInterchange, prevState, setAllow)

  setInterchange([...prevState, {
    owner: false,
    text: searchInterchange(interchanges,question)
  }])
  scrollDown()
}


const scrollDown = () => {
  document.getElementById('scrollTo').scrollIntoView({behavior: "smooth", block: "start"});

}
export const fetchQuery = async (path, params = null) => {
  let url
  if (params !== null) {
    url = `${baseUrl}/${path}/${params}`
  } else {
    url = `${baseUrl}/${path}`
  }
  const response = await fetch(`http://${url}`)
  const data = await response.json()
  return data
}