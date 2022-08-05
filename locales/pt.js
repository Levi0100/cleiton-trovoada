export default {
    get: function(content, options) {
        switch(content) {
            case 'noRank': return 'Este usuário não possui rank'
            case 'noReason': return 'Informe o motivo da punição.'
            case 'noTicket': return `${options.user} não tem nenhum ticket aberto.`
            case 'ticketWillBeDeleted': return 'Aguarde, o ticket será deletado em instantes...'
            case 'bannedSuccessfully': return `${options.user} foi banido com sucesso!`
            case 'invalidMember': return 'Membro inválido!'
            case 'invalidUser': return 'Usuário inválido!'
            default: return content;
        }
    }
}