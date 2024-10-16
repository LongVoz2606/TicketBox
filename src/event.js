const { MongoClient, ObjectId } = require('mongodb');

const regionCodes = {
    "Hà Nội": "29",
    "Hồ Chí Minh": "59",
    "Đà Nẵng": "43",
    "Bình Dương": "61",
    "Đồng Nai": "60",
    "Khánh Hòa": "79",
    "Hải Phòng": "16",
    "Long An": "62",
    "Quảng Nam": "92",
    "Bà Rịa - Vũng Tàu": "72",
    "Đắk Lắk": "47",
    "Cần Thơ": "65",
    "Bình Thuận": "86",
    "Lâm Đồng": "49",
    "Thừa Thiên Huế": "75",
    "Kiên Giang": "68",
    "Bắc Ninh": "99",
    "Quảng Ninh": "14",
    "Thanh Hóa": "36",
    "Nghệ An": "37",
    "Hải Dương": "34",
    "Gia Lai": "81",
    "Bình Phước": "93",
    "Hưng Yên": "89",
    "Bình Định": "77",
    "Tiền Giang": "63",
    "Thái Bình": "17",
    "Bắc Giang": "98",
    "Hòa Bình": "28",
    "An Giang": "67",
    "Vĩnh Phúc": "88",
    "Tây Ninh": "70",
    "Thái Nguyên": "20",
    "Lào Cai": "24",
    "Nam Định": "18",
    "Quảng Ngãi": "76",
    "Bến Tre": "71",
    "Đắk Nông": "48",
    "Cà Mau": "69",
    "Vĩnh Long": "64",
    "Ninh Bình": "35",
    "Phú Thọ": "19",
    "Ninh Thuận": "85",
    "Phú Yên": "78",
    "Hà Nam": "90",
    "Hà Tĩnh": "38",
    "Đồng Tháp": "66",
    "Sóc Trăng": "83",
    "Kon Tum": "82",
    "Quảng Bình": "73",
    "Quảng Trị": "74",
    "Trà Vinh": "84",
    "Hậu Giang": "95",
    "Sơn La": "26",
    "Bạc Liêu": "94",
    "Yên Bái": "21",
    "Tuyên Quang": "22",
    "Điện Biên": "27",
    "Lai Châu": "25",
    "Lạng Sơn": "12",
    "Hà Giang": "23",
    "Bắc Kạn": "97",
    "Cao Bằng": "11",
};

async function generateData() {
    const uri = 'mongodb+srv://group11_22_1:gr11_22_1_cnpm@ticketboxcluster.ucgdq.mongodb.net/TicketBox?retryWrites=true&w=majority&appName=TicketBoxCluster';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db('TicketBox');
        const collection = database.collection('Event');

        const data = [];
        const numberOfDocuments = 5000;
        const currentYear = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const addresses = Object.keys(regionCodes);
        for (let i = 1; i <= numberOfDocuments; i++) {
            const randomIndex = Math.floor(Math.random() * addresses.length);
            const address = addresses[randomIndex];
            const regionCode = regionCodes[address];
            const eventID = `Ev${month}${String(currentYear).slice(-2)}${regionCode}${String(i).padStart(4, '0')}`;
            const status = Math.random() < 0.5 ? 'Active' : 'Inactive';

            data.push({
                _id: new ObjectId(),
                StartDate: "",
                EndDate: "",
                Description: `Description for event ${i}`,
                Address: address,
                VisitCount: Math.floor(Math.random() * 1000),
                Category: `Category ${Math.ceil(Math.random() * 10)}`,
                Status: status,
                EventID: eventID,
            });
        }

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted.`);
    } finally {
        await client.close();
    }
}

generateData().catch(console.error);
