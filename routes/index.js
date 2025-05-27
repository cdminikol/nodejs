var express = require('express');
var router = express.Router();
const user = require('../controller/usercontroller')

router.post('/',user.Insert);
router.put('/:id',user.Update);
router.delete('/:id',user.Delete);


module.exports = router;
