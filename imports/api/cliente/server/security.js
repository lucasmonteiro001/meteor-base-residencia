import {Cliente} from "./../cliente.js"

//A segurança das operações de banco de dados é feita com a ferramenta "ongoworks:security".
//Mais informações: https://atmospherejs.com/ongoworks/security

//################################################
//############ RESTRIÇÃO POR FUNCIONALIDADE ######
//################################################
//Por default, somente administradores conseguem editar as informações.
Cliente.permit(['insert', 'update', 'remove']).ifHasRole('administrador');




//################################################
//############ RESTRIÇÃO POR DADos ###############
//################################################

//Aqui deve sevem ser inseridas as regras referentes às restrições por dados.

// Por exemplo: O usuário só pode alterar registros criados por ele ou se ele pertencer à regra 'Administrador'.
// Para mais informações sobre o uso do módulo Roles veja: http://alanning.github.io/meteor-roles/classes/Roles.html#method_userIsInRole
Security.defineMethod('ownsDocument', {
    fetch: [],
    allow(type, field, userId, doc) {
        if (!field) field = 'userId';
        return userId === doc[field]||Roles.userIsInRole(userId, ['administrador']);
    }
});

Cliente.permit(['update', 'remove']).ownsDocument();