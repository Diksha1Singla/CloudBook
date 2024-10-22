const express = require("express");
const router = express.Router();
const note_controller = require("../controllers/note_controller")
const notesSchema = require("../validator/note_vaildator")
const validate = require("../middleWare/vaildate-middleware")

router.route("/fetchNotes").get(note_controller.fetchUser);
router.route("/addNotes").post(validate(notesSchema),note_controller.addnotes);
router.route("/updateNotes/:id").put(note_controller.updateNote);
router.route("/deleteNotes/:id").delete(note_controller.DeleteNote)

module.exports = router