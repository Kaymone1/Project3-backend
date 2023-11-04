// Dependencies
const express = require('express');
const router = express.Router();
// Require notes model
const Notes = require('../model/notesTemplate');

// Create a new note
router.post('/', async (req, res) => {
    console.log('posted')
    try {
      const newNote = new Notes(req.body);
      const savedNote = await newNote.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

// Get all notes
router.get('/dailylogs', async (req, res) => {
    console.log('retrieved notes')
    try {
      const notes = await Notes.find();
      res.json(notes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
  // Get a specific note by ID
  router.get('/:id', async (req, res) => {
    console.log(Notes)
    try {
      const note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(note);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
// Update a note by ID
router.put('/:id', async (req, res) => {
    console.log('updating')
    try {
      const updatedNote = await Notes.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(updatedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

// Delete a note by ID
router.delete('/:id', async (req, res) => {
    console.log("deleting")
    try {
      const deletedNote = await Notes.findByIdAndDelete(req.params.id);
      if (!deletedNote) {
        return res.status(404).json({ error: 'Note not found' });
      }
      res.json(deletedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
module.exports = router;
