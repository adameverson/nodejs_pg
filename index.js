// Pool(mais rapido mas com algumas restrições) or Client
const Client = require('pg').Client
const cliente = new Client({
    user: "postgres",
    password: "postgres",
    host: "127.0.0.1",
    port: 5432,
    database: "Teste1"
})

//----------- Maneira mais simples de criar uma conexão com o banco --------------
/* cliente.connect() //abrir uma conexão com o banco
cliente.query("select * from usuarios") //executar a query SQL
.then(results => { //jogar o resultado da query no results
    const resultado = results.rows //jogar as linhas do resultado na constante resultado
    console.table(resultado) //exibir o resultado no console.*
})
.finally(() => cliente.end()) // fecha a conexão */

selectUsuarios()
//insertUsuarios("TesteNovo4")
//deleteUsuarios(1)
//updateUsuarios(3, "TesteAntigo4")

async function selectUsuarios(){ // função assyncrona de recuperar dados da tabela usuarios
try{
    console.log("iniciando a conexão.")
    await cliente.connect()
    console.log("Conexão bem sucedida!")
    const resultado = await cliente.query("select * from usuarios") // executa a query SQL
    console.table(resultado.rows) // Lista as tabelas no terminal
}
catch (ex){
    console.log("Ocorreu erro no selectUsuarios. Erro: " + ex)
}
finally{
    await cliente.end()
    console.log("Cliente desconectado.")
}
}

async function insertUsuarios(nome){ // função assyncrona de inserir dados na tabela usuarios
    try{
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida!")
        await cliente.query('insert into usuarios("nome") values (' + "'" + nome + "');")
        console.log("Valor inserido na tabela")
        
        const resultado = await cliente.query("select * from usuarios")
        console.table(resultado.rows)
    }
    catch (ex){
        console.log("Ocorreu erro no inserirUsuarios. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado.")
    }
}

async function deleteUsuarios(id){ // função assyncrona de remover dados da tabela usuarios
    try{
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida!")
        await cliente.query("delete from usuarios where id = " + id + ";")
        console.log("Valor removido da tabela")
        
        const resultado = await cliente.query("select * from usuarios")
        console.table(resultado.rows)
    }
    catch (ex){
        console.log("Ocorreu erro no deleteUsuarios. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado.")
    }
}

async function updateUsuarios(id, nome){ // função assyncrona de alterar dados da tabela usuarios
    try{
        console.log("iniciando a conexão.")
        await cliente.connect()
        console.log("Conexão bem sucedida!")
        await cliente.query("update usuarios set nome = '" + nome + "' where id = " + id + ";")
        console.log("Valor alterado da tabela")
        
        const resultado = await cliente.query("select * from usuarios")
        console.table(resultado.rows)
    }
    catch (ex){
        console.log("Ocorreu erro no updateUsuarios. Erro: " + ex)
    }
    finally{
        await cliente.end()
        console.log("Cliente desconectado.")
    }
}