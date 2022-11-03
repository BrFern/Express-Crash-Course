const express = require('express');
//const uuid = require('uuid');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
//const members =require('./Members');
const router = require('./routes/api/Members');
const members = require('./Members');

const app = express();



//Init middleware
//app.use(logger);

// app.get('/', (req,res) =>{
//     res.send('<h1>Hello World!!!</h1>');
//      res.sendFile(path.join(__dirname, 'public', 'index.html'));
//  });

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage Route
app.get('/', (req,res) => res.render('index', {
    title: 'Member App'
})
);

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Members API Routes
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
    console.log (`Server started on ${PORT}`));

//Create Member
router.post('/', (req,res) => {
    // res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) {
        res.status(400).json({msg: 'Please include a name and email'})
    }


    members.push(newMember);
    res.json(members);
});

//Update Member
router.put('/:id', (req, res) => {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id)); //will give true/false

    if(found) {
        const updMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({msg: 'Member updated', member}); 
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
     //originally printed as a string, fixed to make number

});
//Delete a member

router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id)); 
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }

});
module.exports = router;

