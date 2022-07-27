//using the path of User Model
const Courses = require('../../models/course');
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
   //  Testing for inserting student 
     it('Add Courses testing inserting', () => {
     const courses = {
       
     'courseTitle': 'Python',
     'courseDescription' : "description",
     'coursePrice' : "1000",
     'tutorName': 'mrpython',
     };
     return Courses.create(courses)
     .then((pro_ret) => {
     expect(pro_ret.courseTitle).toEqual('Python');
     });
     });

    
      
    })