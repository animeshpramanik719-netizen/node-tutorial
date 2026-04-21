const express = require("express");
const router = express.Router();
const Person = require("./person");
const { jwtAuthMiddleware, generateToken } = require("./jwt");

// POST - Signup
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();

    const payload = {
      id: response._id,
      username: response.username,
    };

    console.log(JSON.stringify(payload));

    const token = generateToken(payload);

    console.log("Token is:", token);

    res.status(200).json({ response, token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//login route
router.post("/login", async (req,res) =>{

  try{
// Extract username and oassword from request body
const {username,password} = req.body;

// Find user in database
const user = await Person.findOne({username: username});

//if user not exists or password does not match, return error
if (!user || !(await user.comparePassword(password))) {
  return res.status(401).json({ error: "Invalid username or password" });
}



// Generate token
const payload = {
  id: user._id,
  username: user.username,
};
const token = generateToken(payload);

res.json({ token });

  }catch(err){
    console.error(err);
    res.status(500).json({error: 'Internal server Error'});



  }

})


// GET all persons (protected route example)
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET by work type
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (["chef", "manager", "waiter"].includes(workType)) {
      const response = await Person.find({ work: workType });
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid work type" });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updateData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json({ message: "Person deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;