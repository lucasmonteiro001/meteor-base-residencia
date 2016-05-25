import {Template} from 'meteor/templating';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {CtrlCliente} from '../../../api/cliente/controllerCliente.js'
import {Message} from '../../../api/utils/utils';
import './cliente.html';


Template.cliente.onCreated(() => {
    //Faz alguma coisa ao criar o template
});

Template.cliente.helpers({});

Template.clienteAdd.onRendered(() => {
    //Jquery Validation - https://jqueryvalidation.org/validate
    $('#userForm').validate({
        rules: {
            nome: {
                required: true
            },
            telefone: {
                required: true
            },
            Email: {
                required: true,
                email: true
            },
            endereco: {
                required: true
            }

        },
        messages: {
            Email: {
                required: "É obrigado informar um email.",
                email: "O email informado não é um email válido."
            },
            nome: {
                required: "É obrigado informar um nome."
            },
            telefone: {
                required: "É obrigado informar um telefone."
            },
            endereco: {
                required: "É obrigado informar um endereço."
            }
        }
    });


});


    Template.clienteAdd.events({

        //Eventos do template de inserção
        'submit form' (event, template) {
            template = Template.instance();
            event.preventDefault();
            const clienteData = {
                userId: '',
                nome: template.find('[id="nome"]').value.trim(),
                endereco: template.find('[id="endereco"]').value.trim(),
                telefone: template.find('[id="telefone"]').value.trim(),
                Email: template.find('[id="Email"]').value.trim()
            };

            CtrlCliente.insert(clienteData, (erro, data) => {
                if (erro) {
                    Message.showErro(erro.reason);
                    //console.log(erro.reason);
                } else {
                    Message.showSuccessNotification("Cliente inserido com sucesso!");
                    FlowRouter.go('/clienteView/' + data);
                }

            });
        }


    });

    Template.clienteView.onCreated(() => {
        Meteor.subscribe('cliente');

    });

    Template.clienteView.onRendered(() => {
        var id = FlowRouter.getParam('_id');
        var dadosClientes = CtrlCliente.getCliente({_id: id});
        Template.instance().dadosDoCliente = dadosClientes;
        //updateSpans(Template.instance());

    });

    Template.clienteView.helpers({
        'dadosDoCliente': () => {
            var idCliente = FlowRouter.getParam('_id');
            return CtrlCliente.getCliente({_id: idCliente});
        }
    });

    Template.clienteView.events({

        //Eventos do template de inserção
        'click #linkExcluir' (event, template) {
            var sel = event.target;
            var id = sel.getAttribute('value');

            Message.showConfirmation("Remover o cliente?", "Não é possível recuperar um cliente removido!", "Sim, remover!", (erro, confirm) => {
                if (confirm) {
                    CtrlCliente.delete(id, (erro, data) => {
                        if (erro) {
                            Message.showErro(erro.reason);
                            //console.log(erro.reason);
                        } else {
                            FlowRouter.go('cliente');
                            Message.showSuccessNotification("O Cliente foi removido com sucesso!");
                        }
                    });
                }

            });


        }


    });


    Template.clienteEdit.onCreated(() => {
        template = Template.instance();
        Meteor.subscribe('cliente');
    });

    Template.clienteEdit.onRendered(() => {

        var id = FlowRouter.getParam('_id');
        var dadosClientes = CtrlCliente.getCliente({_id: id});
        Template.instance().dadosDoCliente = dadosClientes;


        //Jquery Validation - https://jqueryvalidation.org/validate
        $('#userForm').validate({
            rules: {
                nome: {
                    required: true
                },
                telefone: {
                    required: true
                },
                Email: {
                    required: true,
                    email: true
                },
                endereco: {
                    required: true
                }

            },
            messages: {
                Email: {
                    required: "É obrigado informar um email.",
                    email: "O email informado não é um email válido."
                },
                nome: {
                    required: "É obrigado informar um nome."
                },
                telefone: {
                    required: "É obrigado informar um telefone."
                },
                endereco: {
                    required: "É obrigado informar um endereço."
                }
            }
        });

    });

    Template.clienteEdit.helpers({
        'dadosDoCliente': () => {
            var idCliente = FlowRouter.getParam('_id');
            return CtrlCliente.getCliente({_id: idCliente});
        }
    });

    Template.clienteEdit.events({

        //Eventos do template de inserção
        'submit form' (event, template) {
            event.preventDefault();
            const id = FlowRouter.getParam('_id');
            const clienteData = {
                nome: template.find('[id="nome"]').value.trim(),
                endereco: template.find('[id="endereco"]').value.trim(),
                telefone: template.find('[id="telefone"]').value.trim(),
                Email: template.find('[id="Email"]').value.trim()
            };

            CtrlCliente.update(id, clienteData, (erro, data) => {
                if (erro) {
                    Message.showErro(erro.reason);
                    //console.log(erro.reason);
                } else {
                    Message.showSuccessNotification("O Cliente foi atualizado com sucesso!");
                    FlowRouter.go('/clienteView/' + id);
                }

            });
        }
    });


    Template.clienteList.onCreated(() => {
        Meteor.subscribe('cliente');
    });

    Template.clienteList.helpers({
        clientes() {
            CtrlCliente.getClientes();
        },
        'settings': function () {
            return {
                collection: CtrlCliente.getCollection(),
                rowsPerPage: 10,
                showFilter: true,
                showRowCount: true,
                showColumnToggles: true,
                multiColumnSort: true,
                fields: [
                    {key: 'nome', label: 'Informe um nome', tmpl: Template.clienteTmpl},
                    {key: 'endereco', label: 'Informe o Endereço'},
                    {key: 'telefone', label: 'Telefone/Cel:'},
                    {key: 'Email', label: 'Meu Email'}
                ]
            };
        }
    });

