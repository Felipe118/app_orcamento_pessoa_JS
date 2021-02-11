class Despesas {
    constructor(ano, mes ,dia ,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == "" || this[i] == null){
                return false
            }
            return true
        }
    }
}

class BD {
    constructor(){
        let id = localStorage.getItem('id')
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    gravar(d) {
       

       let id = this.getProximoId()
       localStorage.setItem(id , JSON.stringify(d))
       localStorage.setItem('id',id)
}
    recuperarTodosOsRegistros(){
        let despesas = Array()

       let id =localStorage.getItem('id');
       for(let i = 1; i <= id; i++){
        let despesa = JSON.parse(localStorage.getItem(i))
        //indices null que foram removidos
        //vamos pular esses indices
         if(despesa == null){
             continue

         }
        despesas.push(despesa)
       }
       return despesas
}
}
let bd = new BD()



function cadastrarDespesas(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')


    let despesas = new Despesas(
        ano.value,
        mes.value, 
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
        )
   
        if(despesas.validarDados()){
            bd.gravar(despesas)
            document.getElementById('exampleModalLabel').innerHTML ="Registro Inserido com sucesso"
            document.getElementById('texto-modal').innerHTML ="Despesa Cadastrado com sucesso"
            document.getElementById('modal_titulo_div').className ="  modal-header text-success"
            document.getElementById('botao').className="btn btn-success"
            document.getElementById('botao').innerHTML = "Voltar "
        
          
            $('#modalRegistraDespesas').modal('show')
            ano.value = ""
            mes.value= ""
            dia.value= ""
            tipo.value= ""
           descricao.value= ""
           valor.value= ""

        }else{
            document.getElementById('exampleModalLabel').innerHTML ="Erro!"
            document.getElementById('texto-modal').innerHTML ="Erro ao inserir despesa, verifique se todos os campos foram preenchidos"
            document.getElementById('modal_titulo_div').className = "modal-header text-danger"
            document.getElementById('botao').className="btn btn-danger"
            document.getElementById('botao').innerHTML = "Voltar e corrigir"
          

            $('#modalRegistraDespesas').modal('show')
        }
      

        
}
function carregaListaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosOsRegistros()

    // Selecionando elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function(d){
        console.log(d)

       let linha =  listaDespesas.insertRow()
       //criar as colunas td
       linha.insertCell(0).innerHTML = `${d.dia}/ ${d.mes}/ ${ d.dia}` 
      
//ajustar o tipo]
    switch(d.tipo) {
        case '1': d.tipo = 'Alimentação'
            break
        case '2': d.tipo = 'Educação'
            break
        case '3': d.tipo = 'Lazer'
            break
        case '4': d.tipo = 'Saúde'
            break
        case '5': d.tipo = 'Trasnporte'
        break
        
    }
       linha.insertCell(1).innerHTML = d.tipo

       linha.insertCell(2).innerHTML = d.descricao
       linha.insertCell(3).innerHTML = d.valor
       

    })
}

