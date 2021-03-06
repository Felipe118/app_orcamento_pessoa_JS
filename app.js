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
         if(despesa === null){
             continue

         }
         despesa.id = i
        despesas.push(despesa)
       }
       return despesas
}
    pesquisar(despesas){
        
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosOsRegistros()
        console.log(despesasFiltradas)
       
        //ano
        if(despesas.ano != ""){
           
            despesasFiltradas =   despesasFiltradas.filter(d => d.ano == despesas.ano)
        }
       
        //mes
        if(despesas.mes != ""){
           
            despesasFiltradas =   despesasFiltradas.filter(d => d.mes == despesas.mes)
        }

        //dia
        if(despesas.dia != ""){
           
            despesasFiltradas =   despesasFiltradas.filter(d => d.dia == despesas.dia)
        }
        //tipo
        if(despesas.tipo != ""){
           
            despesasFiltradas =   despesasFiltradas.filter(d => d.tipo == despesas.tipo)
        }
        //descricao
        if(despesas.descricao != ""){
           
            despesasFiltradas =   despesasFiltradas.filter(d => d.descricao == despesas.descricao)
        }
        //valor
        if(despesas.valor != ""){
           
            despesasFiltradas =   despesasFiltradas.filter(d => d.valor == despesas.valor)
        }
        return despesasFiltradas
    }
    remover(id){
		localStorage.removeItem(id)
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
        if (despesas.mes == ""){
           
            document.getElementById('exampleModalLabel').innerHTML ="Erro!"
            document.getElementById('texto-modal').innerHTML ="Erro ao inserir despesa, verifique se todos os campos foram preenchidos"
            document.getElementById('modal_titulo_div').className = "modal-header text-danger"
            document.getElementById('botao').className="btn btn-danger"
            document.getElementById('botao').innerHTML = "Voltar e corrigir"
          

            $('#modalRegistraDespesas').modal('show')
             return false
            
        }
   
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
function carregaListaDespesas(despesas = Array(), filtro = false){
    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosOsRegistros()
    }
    

    // Selecionando elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')
    listaDespesas.innerHTML = ""
        
    despesas.forEach(function(d){
        //console.log(d)

       let linha =  listaDespesas.insertRow()
       //criar as colunas td
       linha.insertCell(0).innerHTML = `${d.dia}/ ${d.mes}/ ${ d.ano}` 
      
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

       //criar botão de exclusao
       let btn = document.createElement("button")
      
       btn.className = 'btn btn-danger btn-sm'
       btn.innerHTML = '<i class="fas fa-times">  </i>'
       btn.id = `id_despesa_${d.id}`
       btn.onclick = function(){
        let id = this.id.replace('id_despesa_','')
        //alert(id)
        bd.remover(id)
        window.location.reload()
    }
       linha.insertCell(4).append(btn)
       console.log(d)
       

    })
}


function pesquisarDespesas(){
   let ano = document.getElementById('ano').value
   let mes = document.getElementById('mes').value
   let dia = document.getElementById('dia').value
   let tipo = document.getElementById('tipo').value
   let descricao = document.getElementById('descricao').value
   let valor = document.getElementById('valor').value

   let despesa = new Despesas(ano,mes,dia,tipo,descricao,valor)
  
    let despesas = bd.pesquisar(despesa)


    this.carregaListaDespesas(despesas, true)
    


}

