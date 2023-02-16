import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

import {api} from '../servives/api'

function Home() {

  const [input, setInput] = useState('') // armazena informação quem da input
  const [cep, setCep] = useState({}) // armazena resposta da api 

  async function handleSearch() {
    if (input === '') {
      alert("Preencha algum CEP")
      return
    }

    try {
      const response = await api.get(`${input}/json`) // api + informação da input
      setCep(response.data)
      console.log(response.data)
      setInput("")
    } catch {
      alert("erro!")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite seu cep" value={input} onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}><FiSearch size={25} color="#fff" /> </button>
      </div>

      {Object.keys(cep).length > 0 && (      
      <main className='main'>
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>{cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>)}

    </div>
  )
}

export default Home
