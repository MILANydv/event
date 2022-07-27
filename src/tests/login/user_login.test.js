//using the path of User Model
const User = require('../../models/user');
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
   //  Testing for inserting student 
     it('Add User testing inserting', () => {
     const user = {
     email: 'ymilan361@gmail.com',
     password: '789456123'
     };
     return User.findOne({ User: user })
     .then((pro_ret) => {
     expect(pro_ret.email).toEqual('ymilan361@gmail.com');
     });
     });

    
      
    })