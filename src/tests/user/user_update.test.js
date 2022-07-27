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


     //Test for updating student 
     it('Test for user update', async () => {
        return User.findOneAndUpdate({_id :Object('621c5a5e7f377f12069957cd')}, 
       {$set : {full_name:'test pass'}})
        .then((pp)=>{
        expect(pp.full_name).toEqual('test pass')
        })
        
       });
    })