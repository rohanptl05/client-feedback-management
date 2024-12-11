import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Feedbacks from "../models/Feedbacks.js";
import { body, validationResult } from "express-validator";
import User from "../models/Users.js"

const router = express.Router();

// router 1: get one users  feedbackes fetch using : Get method 

router.get('/fetchfeedbacks', fetchuser, async (req, res) => {
    try {
        const feedbacks = await Feedbacks.find({ user: req.user.id });
        res.json(feedbacks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})
//router 2 add feedbackes 
router.post('/addfeedbacks', fetchuser, [
    body('title', 'Enter valid title').isLength({ min: 3 }),
    body('desc', 'Description must be least 6 character').isLength({ min: 6 }),
    body('attachment', 'if any file upload it '),
    body('category', 'choise  category'),
    body('priorities', 'choise  priorities'),

], async (req, res) => {
    try {
        const { title, desc, attachment, category, priorities } = req.body;

        //return in bad req
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //
        const feedback = new Feedbacks({
            user: req.user.id,
            title,
            desc,
            attachment,
            category,
            priorities

        });
        const savefeedbacks = await feedback.save();
        res.json(savefeedbacks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');

    }
})
// ROUTER 3 : updets a feedbacks 
router.put("/updatefeedbacks/:id", fetchuser, async (req, res) => {
    const { title, desc, attachment, category, priorities } = req.body;

    try {
        const newFeedbacks = {};
        if (title) { newFeedbacks.title = title };
        if (desc) { newFeedbacks.desc = desc };
        if (attachment) { newFeedbacks.attachment = attachment };
        if (category) { newFeedbacks.category = category };
        if (priorities) { newFeedbacks.priorities = priorities };

        let feedback = await Feedbacks.findById(req.params.id);
        if (!feedback) {
            return res.status(404).send("Note found")
        };

        if (feedback.user.toHexString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        feedback = await Feedbacks.findByIdAndUpdate(req.params.id, { $set: newFeedbacks }, { new: true });
        res.json(feedback)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server Error');

    }

})

// Router 4 delet the note 

router.delete("/deletefeedbacks/:id", fetchuser, async (req, res) => {
    const { title, desc, attachment, category, priorities } = req.body;




    try {
        let feedback = await Feedbacks.findById(req.params.id);
        if (!feedback) {
            return res.status(404).send("Note found")
        };

        if (feedback.user.toHexString() != req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        feedback = await Feedbacks.findByIdAndDelete(req.params.id, { $set: Feedbacks }, { new: true });
        res.json(feedback)

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal server Error');
    }
})


// router 5 Admin can be acssess all the feedbacks
router.get('/allfetchfeedbacks', fetchuser, async (req, res) => {

    

    try {
        const user = await User.findOne({     
            "type": "A", "_id": req.user.id
        });
        if (!user) {
            return res.status(401).send("User not Valid");
        }
        const feedbacks = await Feedbacks.find();
        res.json(feedbacks);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
})







export default router;