/*
1 Obter um usuario
2 Obter o numero de telefone de um usuario a partir de seu ID
3 Obter o endereço do usuario pelo ID
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '1199002',
            ddd: 11
        })
    }, 2000)
}

function obterEndereço(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(erro, usuario) {
    console.log('usuario', usuario)
}

const usuario = obterUsuario(function resolverUsuario(erro, usuario) {
    if (erro) {
        console.error('DEU RUIM em USUARIO', erro)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
        if (erro1) {
            console.error('DEU RUIM em TELEFONE', erro1)
            return;
        }
        obterEndereço(usuario.id, function resolverTelefone(erro2,  endereço) {
            if (erro2) {
                console.error('DEU RUIM em USUARIO', erro2)
                return;
            }
            console.log(`
            Nome: ${usuario.nome},
            Endereço: ${endereço.rua},${endereço.numero}
            Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
    })
})
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', telefone)