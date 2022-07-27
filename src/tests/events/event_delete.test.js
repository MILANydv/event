//using the path of User Model
const Events = require('../../model/event');
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

describe('Courses Schema test For inserting', () => {
   //  Testing for delete  
  
   it('to test the delete user is working or not', async () => {
    const status = await Courses.deleteOne({_id :Object('621c6373e7c1556b35e8ac38')});
    expect(status.ok);
   });
    
      
    })