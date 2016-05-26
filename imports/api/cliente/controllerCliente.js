import {Cliente} from './cliente'

class controllerCliente {

    constructor() {
        //console.log("Iniciou...");

    }

    getAll() {
        const clientes = Cliente.find();
        if (clientes) {
            return clientes;
        }
    };

    getCollection() {
        return Cliente

    }

    get(id) {
        return Cliente.findOne(id);
    }

    insert(clienteData, callback) {
        Meteor.call('cliente.insert', clienteData, (error, result) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, result)
            }
        });
    }

    update(id, clienteData, callback) {
        Meteor.call('cliente.update', id, clienteData, (error) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, "ok")
            }
        });
    }

    remove(id, callback) {

        Meteor.call('cliente.remove', id, (error) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, "ok")
            }
        });
    }

    checkIfCanUserRemove(reactVar, id) {
        var idToCheck = id;
        if (typeof id === 'undefined' || id === null) {
            idToCheck = "id_Fake_For_Permit_this_action";
        } else {
            idToCheck = id;
        }
        Meteor.call('user.can.cliente.remove', idToCheck, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }

    checkIfCanUserInsert(reactVar) {
        Meteor.call('user.can.cliente.insert', (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }

    checkIfCanUserUpdate(reactVar, id) {
        var idToCheck = id;
        if (typeof id === 'undefined' || id === null) {
            idToCheck = "id_Fake_For_Permit_this_action";
        } else {
            idToCheck = id;
        }
        Meteor.call('user.can.cliente.update', idToCheck, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }

}

export const CtrlCliente = new controllerCliente();
