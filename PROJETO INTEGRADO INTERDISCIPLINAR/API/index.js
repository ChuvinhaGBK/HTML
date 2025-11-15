const express = require('express');
const bodyParcer = require('body-parser');
const port = 3000;
const app = express();
const {v4:uuidv4} = require('uuid');
const transacoes = [];

app.use(bodyParcer.json());

const contas = {
    'conta1' : {saldo: 12013},
    'conta2' : {saldo: 1503}
}

app.post('/api/transferencia',(req, res) => {
const {contaPrimaria, contaVizinha, valor} = req.body;

if(!contaPrimaria || !contaVizinha || !valor === undefined){
    return res.status(400).json({mensagem:'Dados não encontrados'})
}

if(!contas[contaPrimaria] || !contas[contaVizinha]){
    return res.status(400).json({mensagem:'Conta primaria ou conta vizinha não foram encontrados'})
}

if(contas [contaPrimaria].saldo < valor){
    return res.status(400).json({mensagem:'Saldo insuficiente'})
}

if(valor <= 0 ){
    return res.status(400).json({mensagem:'o valor da transferido é nulo'})
}

const idTransacao = uuidv4();

const novaTransacao = {

    id : idTransacao,
    contaPrimaria,
    contaVizinha,
    valor,
    status : 'Concluido',
    data: new Date().toISOString()
}

transacoes.push(novaTransacao);
contas[contaPrimaria].saldo -= valor;
contas[contaVizinha].saldo += valor;

return res.status(200).json({
    mensagem: 'Transação feita',
    idTransacao,
    novoSaldoPrimaria : contas[contaPrimaria].saldo,
    NovoSaldoVizinha : contas[contaVizinha].saldo,
});
});

app.listen(port,()=>{
    console.log(`API rodando no http://localhost:${port}`);
});
