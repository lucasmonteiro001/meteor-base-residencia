import {Cliente} from './cliente'
import {controllerBase} from '../util/controllerBase'

class controllerCliente extends controllerBase {

}

export const CtrlCliente = new controllerCliente(Cliente);

//É possível definir neste local as regras de dispobinilizaçao/publicação do conteúdo da collection
//Por exemplo, só exibe os clientes que torcem para o glorioso Atlético-MG: CtrlCliente.setFilter({time: 'Atlético-MG'}).



