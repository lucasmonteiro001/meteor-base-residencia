import {Template} from 'meteor/templating';
import './cliente.html';
import { Cliente } from '../../../api/cliente/cliente.js'


let template;

Template.cliente.onCreated(() => {

    //Faz alguma coisa ao criar o template

});



Template.cliente.helpers({});

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


        }




});


Template.clienteView.onCreated(() => {

    Meteor.subscribe('cliente');



});

Template.clienteView.helpers({
    clientes() {
        const clientes = Cliente.find();
        if ( clientes ) {
            return clientes;
        }
    }
});

