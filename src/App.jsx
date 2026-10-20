import { useState } from 'react'
import Ordem from './components/Ordem.jsx'
import './App.css'

const ordensIniciais = [
  { idOrdem: '1',
   dsCliente: 'Luiz Bottoli',
   dsServico: 'Troca Oleo do Motor',
   nuValor: 55,
   fgConcluida: false },

  { idOrdem: '2',
   dsCliente: 'Luiz Davi', 
   dsServico: 'Regulagem de câmbio', 
   nuValor: 60, 
   fgConcluida: true },

  { idOrdem: '3', 
    dsCliente: 'Luiz Gabriel', 
    dsServico: 
    'Troca de câmara e pneu', 
    nuValor: 120.5, 
    fgConcluida: false },
]

function App() {
  const [ordens, setOrdens] = useState(ordensIniciais)
  const [cliente, setCliente] = useState('')
  const [servico, setServico] = useState('')
  const [valor, setValor] = useState('')
  const [erro, setErro] = useState('')

  function cadastrar(e) {
    e.preventDefault()

    if (cliente.trim() === '' || servico.trim() === '') {
      setErro('Preencha todos os Campos')
      return
    }
    if (valor.trim() === '' || isNaN(Number(valor)) || Number(valor) < 0) {
      setErro('Valor inválido.')
      return
    }

    setOrdens([
      ...ordens,
      {
        idOrdem: crypto.randomUUID(),
        dsCliente: cliente,
        dsServico: servico,
        nuValor: Number(valor),
        fgConcluida: false,
      },
    ])
    setCliente('')
    setServico('')
    setValor('')
    setErro('')
  }

  function alternar(id) {
    setOrdens(
      ordens.map((o) => (o.idOrdem === id ? { ...o, fgConcluida: !o.fgConcluida } : o))
    )
  }

  function remover(id) {
    setOrdens(ordens.filter((o) => o.idOrdem !== id))
  }

  const abertas = ordens.filter((o) => !o.fgConcluida)
  const valorAberto = abertas.reduce((soma, o) => soma + o.nuValor, 0)

  return (
    <div>
      <h1>Oficina</h1>

      <p>
        Total: {ordens.length} | Em aberto: {abertas.length} | Valor em aberto: R$ {valorAberto}
      </p>

      <form onSubmit={cadastrar}>
        <input placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
        <input placeholder="Serviço" value={servico} onChange={(e) => setServico(e.target.value)} />
        <input placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
        <button>Cadastrar</button>
      </form>
      {erro && <p className="erro">{erro}</p>}

      {ordens.length === 0 && <p>Não há ordens.</p>}

      {ordens.map((o) => (
        <Ordem key={o.idOrdem} ordem={o} alternar={alternar} remover={remover} />
      ))}
    </div>
  )
}

export default App