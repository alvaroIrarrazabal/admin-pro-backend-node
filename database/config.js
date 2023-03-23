const mongoose = require('mongoose');

const dbConnection = async () => {
    
    try {
        await mongoose.connect(process.env.DBCONNECT)
        
    
        console.log('Connected to')

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting desde el catcher');
    }
}

module.exports = {
    dbConnection: dbConnection
}
