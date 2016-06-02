export class controllerBase {


    constructor(collection) {
        this.myCollection = collection;
        this.filter = {};

        this.projection_list = {};

        this.projection_edit = {};

        this.projection_view = {};

    }

    setRoles(filter) {
        this.filter = filter;
    }

    setProjectionView(projection) {
        this.projection_view = projection;
    }

    setProjectionEdit(projection) {
        this.projection_edit = projection;
    }

    setProjectionList(projection) {
        this.projection_list = projection;
    }

    getAll() {
        const collectionData = this.myCollection.find();
        if (collectionData) {
            return collectionData;
        }
    };

    getCollection() {
        return this.myCollection

    }

    getCollectionName() {
        return this.myCollection._name;
    }

    get(id) {
        return this.myCollection.findOne(id);
    }

    applySubscribe(template, acao,id="") {
        let filterTmp = this.filter;
        if(id != "") {
            console.log("Id não-vazio");
            filterTmp = {_id:id}
        }
            console.log(this.filter);
        switch(acao) {
            case 'list':
                template.subscribe(this.getCollectionName(), filterTmp, this.projection_list);
                break;
            case 'view':
                template.subscribe(this.getCollectionName(), filterTmp, this.projection_view);
                break;
            case 'edit':
                template.subscribe(this.getCollectionName(), filterTmp, this.projection_edit);
                break;
            default:
                template.subscribe(this.getCollectionName(), filterTmp, this.projection_list);
        }


    }

    insert(collectionData, callback) {
        Meteor.call(this.getCollectionName() + '.insert', collectionData, (error, result) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, result)
            }
        });
    }

    update(id, collectionData, callback) {
        Meteor.call(this.getCollectionName() + '.update', id, collectionData, (error) => {
            if (error) {
                callback(error, null)
            } else {
                callback(null, "ok")
            }
        });
    }

    remove(id, callback) {

        Meteor.call(this.getCollectionName() + '.remove', id, (error) => {
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
        Meteor.call('user.can.' + this.getCollectionName() + '.remove', idToCheck, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }

    checkIfCanUserInsert(reactVar) {
        Meteor.call('user.can.' + this.getCollectionName() + '.insert', (error, result) => {
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
        Meteor.call('user.can.' + this.getCollectionName() + '.update', idToCheck, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                reactVar.set(result);
            }
        });
    }

}


