document.addEventListener('DOMContentLoaded',()=>{

const extratoDD = {
    saldo: 5000.00,
    TipoTransacao: [
        {tipo: 'venda', descricao: 'venda - fone', valor:300.50},
        {tipo: 'venda', descricao: 'Console Sony PlayStation 5', valor: 3440.07},
        {tipo: 'venda', descricao: 'Placa de Vídeo MSI RTX 5070 12G', valor:5333.32},
        {tipo: 'venda', descricao: 'Jogo Pokémon Legends Z-A', valor:324.57},
        {tipo: 'venda', descricao: 'Memória RAM Kingston Fury Beast', valor:399.99},
        {tipo: 'venda', descricao: 'Placa de Vídeo Gigabyte RTX 507', valor:5322.21}
    ]
};

const saldoEN = document.getElementById('saldo')
const listaEN = document.getElementById('listaTrans')

saldoEN.textContent = `saldo ${extratoDD.saldo.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})}`

extratoDD.TipoTransacao.forEach(transacao =>{
    const ListaEntidade = document.createElement('li');
    ListaEntidade.classList.add('transacao');

    if (Math.abs(transacao.valor) >= 5000) {
        ListaEntidade.classList.add('destaque');
    }

    const ValorFormato = new Intl.NumberFormat('pt-BR',{
        style: 'currency',
        currency: 'BRL'
    }).format(transacao.valor);

    ListaEntidade.innerHTML = `
    <div class="transacao-info">
        <span> ${transacao.descricao}</span>
        <span class="transacao-valor ${transacao.valor > 0 ? 'valorcor' : '' }" >
        ${ValorFormato}
    `;
    listaEN.appendChild(ListaEntidade);

})

})