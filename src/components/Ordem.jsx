import './Ordem.css'

function Ordem({ ordem, alternar, remover }) {
  return (
    <div className={ordem.fgConcluida ? 'ordem concluida' : 'ordem'}>
      <b>{ordem.dsCliente}</b> - {ordem.dsServico} - R$ {ordem.nuValor}
      {ordem.fgConcluida && <span className="selo"> Concluída</span>}
      <br />
      <button onClick={() => alternar(ordem.idOrdem)}>
        {ordem.fgConcluida ? 'Reabrir' : 'Concluir'}
      </button>
      <button onClick={() => remover(ordem.idOrdem)}>Remover</button>
    </div>
  )
}

export default Ordem