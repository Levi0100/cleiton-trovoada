export default {
    get: function(content, options = {}) {
        switch(content) {
            case 'noRank': return 'This user doesn\'t have rank'
            case 'noReason': return 'Enter the punishment reason'
            case 'noTicket': return `${options.user} has no open tickets.`
            case 'ticketWillBeDeleted': return 'Await, the ticket will be deleted in a few seconds...'
            case 'bannedSuccessfully': return `${options.user} has been banned successfully!`
            case 'invalidMember': return 'Invalid member!'
            case 'invalidUser': return 'Invalid user!'
            default: return content;
        }
    }
}