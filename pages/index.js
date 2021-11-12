import Head from 'next/head'
import { useState, useEffect } from 'react'
import { createMarkup, tranformInterchanges, showBotTyping, getBotAnswer, fetchQuery } from '../utils/helper'

export default function Home( { interchanges }) {
  const [userQuestion, setUserQuestion] = useState('')
  const [allow, setAllow] = useState(false)
  const [interchange, setInterchange] = useState([])

 useEffect(async () => {
 await showBotTyping(setInterchange, [], setAllow)
 setInterchange([{
  owner: false,
  text: tranformInterchanges(interchanges, true)
}])
}, [interchanges])


const handleSubmit = async (e) => {
  e.preventDefault()
  if(!userQuestion || !allow) return
  const uQ = userQuestion
  const newInterchange = [...interchange, {
    owner: true,
    text: userQuestion
  }]

  setInterchange(newInterchange)
  setUserQuestion('')
  setAllow(false)
  getBotAnswer(interchanges, setInterchange,  uQ, newInterchange, setAllow)
}

  return (
    <div className="flex flex-col font-mono items-center justify-center min-h-screen">
      <Head>
        <title>ChatBot Assistant</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form className="flex flex-col w-full flex-1" onSubmit={handleSubmit}>
       
        <header className="flex w-full h-24 fixed bg-black border-b">
        
          <span className="flex items-center text-white font-bold text-lg p-2"> Bot Assistant</span>
       </header>
        <div className="flex flex-col mt-24 bg-gray-200  overflow-scroll p-2 w-full" style={{ height: "80vh"}}>
        {interchange.map((chat,i) => (
          chat.owner ? 
          <div key={i} className = "user flex flex-row my-2 w-full p-2">
          <span className = "w-2/3"></span>
          <span className = "w-1/3 bg-gray-100 p-2 rounded">
           {chat.text}
          </span>
        </div>
         :   
          <div key={i} className = "bot my-2 bg-gray-100 w-1/2 lg:w-1/3  p-2 rounded">
            <span dangerouslySetInnerHTML={createMarkup(chat.text)} />
          </div>
        ))}

        <div id="scrollTo"></div>
        </div>

        <footer className = "flex flex-row justify-between items-center p-1 h-5/6  w-full -bottom-5">
        <div className = "flex flex-row justify-between flex-1 bg-white w-full">
          <input className = " bg-gray-200 w-2/3 p-2 " placeholder="Type a message" value={userQuestion} onChange={ (e) => { setUserQuestion(e.target.value)}}/>
          <button className = " bg-black p-2 ml-2 w-1/3  text-white" type="submit"> Send</button>
        </div>
        </footer>
      </form>

      
    </div>
  )
}


export async function getStaticProps() {
  const interchanges = await fetchQuery('interchanges')
  return {
    props: {
      interchanges
    }
  }
}