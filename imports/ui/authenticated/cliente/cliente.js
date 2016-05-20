import {Template} from 'meteor/templating';
import './cliente.html';
import '../../globals/page-heading.html';
import { Cliente } from '../../../api/cliente/cliente.js'
import {FlowRouter} from 'meteor/kadira:flow-router';


let template;

Template.cliente.onCreated(() => {

    //Faz alguma coisa ao criar o template

});



Template.cliente.helpers({

});

Template.clienteAdd.onCreated(() => {

    //Faz alguma coisa ao criar o template de inserção

});



Template.clienteAdd.events({

    //Eventos do template de inserção

    'submit form' (event, template) {

        template = Template.instance();



            event.preventDefault();

            const clienteData = {
                nome: template.find('[id="nome"]').value.trim(),
                endereco: template.find('[id="endereco"]').value.trim(),
                telefone: template.find('[id="telefone"]').value.trim(),
                Email: template.find('[id="Email"]').value.trim(),
               userId: ''
            };

                Meteor.call('cliente.insert', clienteData, (error) => {
                    if (error) {
                        alert(error.reason);
                    } else {
                        template.find('form').reset();
                    }
                });

            FlowRouter.go('cliente');

        }




});

var updateFields = function(template) {

    var id = FlowRouter.getParam('_id');
    const clientes = Cliente.findOne({_id: id});
    if (clientes) {
        template.clienteNome = clientes.nome;
        template.find('[id="nome"]').value = clientes.nome;
        template.find('[id="endereco"]').value = clientes.endereco;
        template.find('[id="telefone"]').value = clientes.telefone;
        template.find('[id="Email"]').value = clientes.Email;

    }

};

var updateSpans = function(template) {

    var id = FlowRouter.getParam('_id');
    const clientes = Cliente.findOne({_id: id});
    if (clientes) {

        $("#nomeObjeto").text(clientes.nome);
        $("#bc-nomeObjeto").text(clientes.nome);
        $("#nome").text(clientes.nome);
        $("#endereco").text(clientes.endereco);
        $("#telefone").text(clientes.telefone);
        $("#Email").text(clientes.Email);

    }

}


Template.clienteView.onCreated(() => {
    Meteor.subscribe('cliente');

});

Template.clienteView.onRendered(() => {
    var id = FlowRouter.getParam('_id');
    Template.instance().clienteNome = "";
    Template.instance().clienteID = id;
    updateSpans(Template.instance());

});

Template.clienteView.helpers({
    clienteID() {
        return FlowRouter.getParam('_id');
    },
    clientes() {

        updateSpans(Template.instance());
    }
});

Template.clienteView.events({

    //Eventos do template de inserção

    'click #linkExcluir' (event, template) {

        var id = $(event.target).data('value');

        console.log("Evento Jquery"+$(event.target));
        console.log("ID:"+id);
        console.log("Event Puro:"+event);

        Meteor.call('cliente.delete',id, (error) => {
            if (error) {
                alert(error.reason);
            } else {
                FlowRouter.go('cliente');
            }
        });


    }




});



Template.clienteEdit.onCreated(() => {

    template = Template.instance();
    
    
    Meteor.subscribe('cliente');

});

Template.clienteEdit.onRendered(() => {
    updateFields(Template.instance());

});

Template.clienteEdit.helpers({
    clienteID() {
        return FlowRouter.getParam('_id');
    },    
    clientes() {
        
        updateFields(Template.instance());
    }
});

Template.clienteEdit.events({

    //Eventos do template de inserção

    'submit form' (event, template) {
        
        template = Template.instance();



        event.preventDefault();
        const id = FlowRouter.getParam('_id');
        const clienteData = {
            nome: template.find('[id="nome"]').value.trim(),
            endereco: template.find('[id="endereco"]').value.trim(),
            telefone: template.find('[id="telefone"]').value.trim(),
            Email: template.find('[id="Email"]').value.trim()
        };

        Meteor.call('cliente.update',id, clienteData, (error) => {
            if (error) {
                alert(error.reason);
            } else {
                FlowRouter.go('/clienteView/'+id);
            }
        });


    }




});




Template.clienteList.onCreated(() => {

    Meteor.subscribe('cliente');



});

Template.clienteList.helpers({
    clientes() {
        const clientes = Cliente.find();
        if ( clientes ) {
            return clientes;
        }
    },
    'settings': function () {
        return {
            collection: Cliente,
            rowsPerPage: 10,
            showFilter: true,
            showRowCount: true,
            showColumnToggles: true,
            multiColumnSort: true,
            fields: [
                {key:'nome', label:'Nome', tmpl: Template.nomeTmpl},
                {key:'endereco', label:'Endereço'},
                {key:'telefone', label:'Telefone'},
                {key:'Email', label:'Email'}
            ]
        };
    }
});

