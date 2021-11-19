const express = require('express');
const { response } = require('../app');
const router = express.Router();

const Post = require('../models/post');

router.get('/', (req, res) => {
    const posts = Post.allPosts;
    res.send(posts);
})

router.get('/:id', (req, res) => {
    try{
    const id = parseInt(req.params.id)
    console.log(id)
    const post = Post.findById(id);
    res.send(post);
    }
    catch(err) {
        console.log(err);
        res.status(404).send(err)
    }
})



module.exports = router;