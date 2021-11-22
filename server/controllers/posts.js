const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.get('/', (req, res) => {
    const posts = Post.allPosts;
    res.send(posts);
})

router.post('/', (req, res) => {
    const data = req.body;
    const newPost = Post.create(data);
    res.status(201).send(newPost);
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

router.post(':id', (req, res) => {
    const id = parseInt(req.params.id)
    const post = Post.findById(id)
    
})



module.exports = router;