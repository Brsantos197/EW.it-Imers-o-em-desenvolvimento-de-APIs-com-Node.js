/*
1 Obter um usuario
2 Obter o numero de telefone de um usuario a partir de seu ID
3 Obter o endereco do usuario pelo ID
*/
// importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    // quando der algum problema -> reject(ERRO)
    // quando sucesso -> RESOLVE
    return new Promise(function resolvePromise(resolve, reject) {
        // return reject(new Error('DEU RUIM DE VERDADE!'))

        setTimeout(function() {
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)

    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000)

    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

const usuarioPromise = obterUsuario()
    // para manipular o sucesso usamos a funcão .then
    // para manipular o erros, usamos o .catch
    // usuario -> telefone -> telefone
usuarioPromise
    .then(function(usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function(resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function(resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `);
    })
    .catch(function(error) {
        console.error('DEU RUIM', error);
    })

// const usuario = obterUsuario(function resolverUsuario(erro, usuario) {
//     if (erro) {
//         console.error('DEU RUIM em USUARIO', erro)
//         return;
//     }
//     obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
//         if (erro1) {
//             console.error('DEU RUIM em TELEFONE', erro1)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverTelefone(erro2,  endereco) {
//             if (erro2) {
//                 console.error('DEU RUIM em USUARIO', erro2)
//                 return;
//             }
//             console.log(`
//             Nome: ${usuario.nome},
//             Endereco: ${endereco.rua},${endereco.numero}
//             Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })
// })
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', telefone)