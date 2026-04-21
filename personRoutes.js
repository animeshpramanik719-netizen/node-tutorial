const express = require("express");
const router = express.Router();
const Person = require("./person");

// POST add person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();

    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET all persons
router.get("/", async (req, res) => {
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

    if (
      workType === "chef" ||
      workType === "manager" ||
      workType === "waiter"
    ) {
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

// UPDATE person
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updateData = req.body;

    const response = await Person.findByIdAndUpdate(
      personId,
      updateData,
      {
        new: true,
        runValidators: true,
      }
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

// DELETE person
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