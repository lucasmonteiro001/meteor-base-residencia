import { Template } from 'meteor/templating';

import './teste.html';

Template.apresentar.helpers({
  nome : "Lucas"
});

export const Teste = "apresentar"
