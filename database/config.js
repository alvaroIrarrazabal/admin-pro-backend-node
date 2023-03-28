const mongoose = require('mongoose');

const dbConnection = async () => {
    
    try {
        mongoose.connect(process.env.DBCONNECT, {
            useNewUrlParser: true,
           
            useUnifiedTopology: true
        });
        
    
        console.log('Connected to')

    } catch (error) {
        console.log(error);
        throw new Error('Error connecting desde el catcher');
    }
}

module.exports = {
    dbConnection: dbConnection
}
