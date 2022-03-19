let carro = {marca: 'Fiat', modelo: '147', cor: 'azul', ano: '1980'}

let carro1 = {marca: 'Chevrolet', modelo: 'Opala', cor: 'preto', ano: 1938, placa: 'ABC-1234'} // cria a variavel para inserção

db.veiculos.insertOne(carro) // é o equivalente a um insert into

db.veiculos.find() // listar todos os documentos da collection

show collection // comando para ver as collections

db.veiculos.insertOne({marca: 'Volkswagen', modelo: 'Variant', cor:'bege', ano: 1979, opcionais:['trio', 'bancos de couro']}) // metodos de inserção sem utilização de variáveis antes

let carro2 = {marca: 'Ford', modelo:'Corcell II', cor: 'azul', ano:1980}
let carro3 = {marca: 'Fiat', modelo: 'Oggi', cor: 'preto', ano: 1983}

db.veiculos.insertMany([carro1, carro2]) // para inserir varias informações no banco, use tanto variaveis ou os proprios objetos separados por virgula (,)

db.veiculos.find().count() // retorna a quantidade de inserções na collection

db.veiculos.find({ano:1980}) // o parametro que é um objeto, é usado para filtrar as informações de dentro da collection

db.veiculos.find({marca: /Volks/i}) // podemos pesquisa com sintaxe de regex. Assim nesse caso temos o retorno de como like do SQL

db.veiculos.find({cor: 'azul'}, {marca: 1, modelo: 1}) // o segundo parametro expressa quais campos você quer recuperar

db.veiculos.find({cor: 'azul'}, {marca: 0, mocelo: 0}) // mudando para 0 os valores do segundo parâmetro, significa que retornará todas as outras informações com exceção daquelas listas em 0.
//obs: não é possivel misturar 1 e 0 na mesma busca.

db.veiculos.find({$and: [{ano: 1980}, {cor: 'azul'}]}) // filtra por dois campos ao mesmo tempo

db.veiculos.updateOne({_id:ObjectId('valor do id do objeto que quer modificar')}, {$set: {cor: 'morrom'}}) // altera o valor de um objeto, sendo que o primeiro parametro deve ser informado quem deseja alterar e o segundo o que deseja alterar


let carro4 = {marca: 'Volkswagen', modelo:  'Fusca', ano: 1969, cor: 'branco', proprietario: {nome: 'Alcebíades de Almeida', cpf: '123.456.789-01', cidade: 'Franca/SP'}}

db.veiculos.insertOne(carro4)

db.veiculos.find({'proprietario.nome': /Alce/i}) // realiza uma busca pelo sub documento

let proprietario = {
    'nome': 'Belamino Barbosa Borges',
    'data_nascimento': '1959-10-30',
    'cpf': '987.654.321-98',
        'endereço': [
            {
                'tipo': 'residencial',
                'logradouro': 'Rua do Sobe e Desce, 333',
                'municipal': 'Morro Alto de Cima/MG'
            },
            {
                'tipo': 
            }
        ]
}

db.veiculos.updateOne({_id:ObjectId('valor do id do objeto que quer modificar')}, {$unset:{proprietario: null}})


db.veiculos.insertOne({marca: 'Volkswagen', modelo: 'Variant', cor:'bege', ano: 1979, opcionais:['trio', 'bancos de couro'], proprietario_id: {'_id': 'valor do id'}}) // relaciona dois documentos de coleções diferentes

db.veiculos.updateOne({'_id': ObjectId('valor do id do documento pai')}, {$set: {proprietario_id: {'_id': 'id do documento que será associado'}}}) // quando se tem um documento e se quer inserir uma associação de outro documento


db.proprietarios.aggregate([

    { $addFields: {'prop_id': {$toString: '$_id'}}},

    {
        $lookup: {
            from: 'veiculos',
            localField: 'prop_id',
            foreignField: 'proprietario_id',
            as: 'veiculos'
        }
    }
])