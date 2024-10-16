const { MongoClient, ObjectId } = require('mongodb');

async function generateTicketData() {
    const uri = 'mongodb+srv://group11_22_1:gr11_22_1_cnpm@ticketboxcluster.ucgdq.mongodb.net/TicketBox?retryWrites=true&w=majority&appName=TicketBoxCluster';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('TicketBox');
        const eventCollection = database.collection('Event');
        const ticketCollection = database.collection('Ticket');

        const events = await eventCollection.find({}, { projection: { EventID: 1 } }).toArray();
        const eventIDs = events.map(event => event.EventID);

        const ticketData = [];
        const numberOfTickets = 5000;
        const ticketTypes = ['VIP', 'Standard', 'Economy'];

        for (let i = 1; i <= numberOfTickets; i++) {
            const randomEventIndex = Math.floor(Math.random() * eventIDs.length);
            const eventID = eventIDs[randomEventIndex];

            const ticketID = `Tk${String(i).padStart(5, '0')}`;
            const type = ticketTypes[Math.floor(Math.random() * ticketTypes.length)];
            const quantity = Math.floor(Math.random() * 100) + 1;
            const price = Math.floor(Math.random() * 500) + 50;
            const status = Math.random() < 0.5 ? 'Available' : 'SoldOut';

            ticketData.push({
                _id: new ObjectId(),
                EventID: eventID,
                TicketID: ticketID,
                Type: type,
                Quantity: quantity,
                Price: price,
                Status: status,
            });
        }

        const result = await ticketCollection.insertMany(ticketData);
        console.log(`${result.insertedCount} ticket documents were inserted.`);
    } finally {
        await client.close();
    }
}

generateTicketData().catch(console.error);
