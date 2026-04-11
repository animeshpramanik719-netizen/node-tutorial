const express = require('express');
const router = express.Router();
const person = require('./person');
  

//POST router to add a person
router.post('/', async(req, res) => {
  try {
    const data = req.body;
    const newPerson = new person(data);
    const response = await newPerson.save();
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
});


//GET method to get the person
router.get('/', async(req, res)=>{
  try{
    const persons = await person.find();
    res.status(200).json(persons);
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'internal server error'});

  }
})


router.get('/:workType',async (req,res)=>{
  try{
   const  workType = req.params.workType; // Extract the work type from the URL parameters
   if(workType == 'chef' || workType == 'manager'|| workType == 'waiter'){

    const response = await person.find({work: workType});
    console.log('response fetched');
    res.status(200).json(response);

   }else{
    res.status(400).json({error: 'Invalid work type'});
   }
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
   
});


//update the pperson details
router.put('/:id', async (req, res) =>{

  try{
    const personId = req.params.id; // Extract the person Id from the URL parameters
    const updatePersonData = req.body; // Upadate data for the person from the request body

    const response = await person.findByIdAndUpdate(personId, updatePersonData, {
      new: true, // Return the updated document
      runValidators: true, // Run mongoose validators on the update data
    })

    if(!response){
      return res.status(404).json({error: 'Person not found'});
    }

    console.log('data updated');
    res.status(200).json(response);
  }catch(err){
console.log(err);
res.status(500).json({error: 'Internal server error'});
  }

})

router.delete('/:id', async (req, res) =>{
  try{
    const personId = req.params.id; // Extract the person Id from the URL parameters
    

    // Asssming you have a person model and you want to delete

  const response = await personfindByIdAndRemove(personId);
  if(!response){
     return res.status(404).json({error: 'Person not found'});

  }
  console.log('data deleted');
  res.status(200).json({message: 'Person deleted successfully'});

  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal server error'});
  }
})

module.exports = router;