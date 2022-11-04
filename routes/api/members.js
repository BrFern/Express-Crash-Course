const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');


//Gets All Members
router.get('/', (req, res)=> 
    res.json(members));

//Get Single Member
router.get('/:id', (req, res) => {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id)); //will give true/false

    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id))); 
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
     //originally printed as a string, fixed to make number

});

//Create Member
router.post('/', (req,res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status:'active'
    };

    if (!newMember.name || !newMember.email){
        return res.status(400).json({msg:'Please include a name and email'});
    }

    members.push(newMember);
})
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
        res.json({
        msg: 'Member deleted', 
        members:filter(member => member.id === parseInt(req.params.id))
    });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }

});
module.exports = router;
// module.exports = members;



