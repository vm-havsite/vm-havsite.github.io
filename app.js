const { StreamChat } = require('stream-chat');

const apiKey = 'uwf9mj6pb9ez'; // Replace with your API key
const client = StreamChat.getInstance(apiKey);

async function connectUser () {
    const userId = 'user_id'; // Replace with a unique user ID
    const userToken = 'tk1'; // Replace with a valid user token

    await client.connectUser (
        {
            id: userId,
            name: 'User  Name', // Replace with the user's name
        },
        userToken
    );

    // Create a channel
    const channel = client.channel('messaging', 'general', {
        name: 'General Chat',
    });

    await channel.create();
    console.log('Channel created:', channel);
}

connectUser ().catch(console.error);