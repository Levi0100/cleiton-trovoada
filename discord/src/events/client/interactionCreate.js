import {Event, Button} from '../../structures/index.js'
import {ComponentInteraction} from 'eris'
import {User} from '../../../../database/index.js'

export default class InteractionCreateEvent extends Event {
    constructor(client) {
        super({
            name: 'interactionCreate',
            client
        });
    }
    async run(interaction) {
        if(interaction instanceof ComponentInteraction) {
            if(interaction.data.custom_id.startsWith('delete-')) {
                const user = await User.findById(interaction.data.custom_id.replace('delete-', ''));
                await interaction.defer(64);
                interaction.createMessage('Aguarde, o ticket será deletado em instantes...');
                setTimeout(() => {
                    this.client.getChannel(user.supportOpened).delete(`Ticket encerrado por ${interaction.member.username}`);
                    user.supportOpened = null;
                    user.save();
                }, 10000);
            }
            switch(interaction.data.custom_id) {
                case 'ticket': {
                    await interaction.defer(64);
                    await interaction.createMessage('<a:carregando:809221866434199634> Aguarde, seu ticket está sendo criado...');
                    const user = await User.findById(interaction.member.id) || new User({_id: interaction.member.id});
                    if(user.ticketOpened) return interaction.editOriginalMessage('<:error:869391072051216425> Você já tem um ticket criado... aguarde até que o mesmo seja encerrado e tente novamente.');
                    interaction.guild = this.client.guilds.get(interaction.guildID);
                    var channel = await interaction.guild.createChannel(`ticket-${interaction.member.username.toLowerCase().replace('_', '')}-${interaction.member.discriminator}`, 0, {
                        reason: `${interaction.member.username} criou um ticket`,
                        parentID: '871209554304716840'
                    });
                    await channel.editPermission(interaction.guildID, 0, 1024, 0, `${interaction.member.username} criou um ticket`);
                    await channel.editPermission(interaction.member.id, 52224, 0, 1, `${interaction.member.username} criou um ticket`);
                    await channel.editPermission('988988540526399598', 60416, 0, 0, `${interaction.member.username} criou um ticket`);
                    await channel.createMessage(`<:notify:831457702332465172> ${interaction.member.mention} seu ticket foi criado com Successo!`);
                    user.ticketOpened = channel.id;
                    await user.save();
                    interaction.editOriginalMessage(`<:Success:869391072323846184> Ticket criado: ${channel.mention}`);
                }
                    break;
                case 'verify': {
                    await interaction.deferUpdate();
                    await interaction.member.addRole('856233505917632533');
                    this.client.getChannel('813485302039314504')
                    .createMessage(`<:welcome:990614456415440956> ${interaction.member.mention} acabou de cair de paraquedas aqui! :0`);
                }
                    break;
                case 'support': {
                    await interaction.defer(64);
                    await interaction.createMessage('<a:carregando:809221866434199634> Aguarde, seu ticket está sendo criado...');
                    const user = await User.findById(interaction.member.id) || new User({_id: interaction.member.id});
                    if(user.supportOpened) return interaction.editOriginalMessage('<:error:869391072051216425> Você já tem um ticket criado... aguarde até que o mesmo seja encerrado e tente novamente.');
                    interaction.guild = this.client.guilds.get(interaction.guildID);
                    var channel = await interaction.guild.createChannel(`ticket-${interaction.member.username.toLowerCase().replace('_', '')}-${interaction.member.discriminator}`, 0, {
                        reason: `${interaction.member.username} criou um ticket`,
                        parentID: '990474921417273404'
                    });
                    const button = new Button();
                    button.setStyle('RED');
                    button.setLabel(`Deletar`);
                    button.setCustomID(`delete-${interaction.member.id}`);
                    await channel.editPermission(interaction.guildID, 0, 1024, 0, `${interaction.member.username} criou um ticket`);
                    await channel.editPermission(interaction.member.id, 52224, 0, 1, `${interaction.member.username} criou um ticket`);
                    await channel.editPermission('797289732513857556', 60416, 0, 0, `${interaction.member.username} criou um ticket`);
                    await channel.editPermission('988988540526399598', 60480, 0, 0, `${interaction.member.username} criou um ticket`);
                    const message = await channel.createMessage({
                        content: `<:notify:831457702332465172> ${interaction.member.mention} seu ticket foi criado com Successo!`,
                        components: [button]
                    });
                    message.pin();
                    user.supportOpened = channel.id;
                    await user.save();
                    interaction.editOriginalMessage(`<:Success:869391072323846184> Ticket criado: ${channel.mention}`);
                }
                    break;
                case 'support-en': {
                    await interaction.defer(64);
                    await interaction.createMessage('<a:carregando:809221866434199634> Please wait, your ticket is being created...');
                    const user = await User.findById(interaction.member.id) || new User({_id: interaction.member.id});
                    if(user.supportOpened) return interaction.editOriginalMessage('<:error:869391072051216425> You already has a opened ticket... wait until it closes and try again.');
                    interaction.guild = this.client.guilds.get(interaction.guildID);
                    var channel = await interaction.guild.createChannel(`ticket-${interaction.member.username.toLowerCase().replace('_', '')}-${interaction.member.discriminator}`, 0, {
                        reason: `${interaction.member.username} criou um ticket`,
                        parentID: '990474921417273404'
                    });
                    const button = new Button();
                    button.setStyle('RED');
                    button.setLabel(`Delete`);
                    button.setCustomID(`delete-${interaction.member.id}`);
                    await channel.editPermission(interaction.guildID, 0, 1024, 0, `${interaction.member.username} criou um ticket`);
                    await channel.editPermission(interaction.member.id, 52224, 0, 1, `${interaction.member.username} criou um ticket`);
                    await channel.editPermission('988988540526399598', 60416, 0, 0, `${interaction.member.username} criou um ticket`);
                    const message = await channel.createMessage({
                        content: `<:notify:831457702332465172> ${interaction.member.mention} your ticket has been created Successfully!`,
                        components: [button]
                    });
                    message.pin();
                    user.supportOpened = channel.id;
                    await user.save();
                    interaction.editOriginalMessage(`<:Success:869391072323846184> Ticket created: ${channel.mention}`);
                }
            }
        }
    }
}