//using the path of User Model
const User = require('../../models/student');
const mongoose =  require('mongoose');

// using abs_test as the test database
const url =
  "mongodb+srv://milan361:iZEK0AAW2n6p4ilc@cluster0.uanmf.mongodb.net/event_management?retryWrites=true&w=majority";
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
//  useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});

describe('User Schema test For inserting', () => {
   
     it('to test the get student is working or not', async () => {
    const status = await User.find();
    expect(status.ok);
   });
    })