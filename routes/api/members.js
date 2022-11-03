const express = require('express');
const router = express.Router();
const members = require('../../Members');


//Gets All Members
router.get('/', (req, res)=> {
    res.json(members);
});

//Get Single Member
router.get('/:id', (req, res) => {
    //res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id)); //will give true/false

    if(found) {
        res.json({msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
     //originally printed as a string, fixed to make number

});

module.exports = router;

