const postsData = require('../data');

class Post{
    constructor(data){
        this.id = data.id;
        this.title = data.title;
        this.message = data.message;
        this.image = data.image;
        this.dislikes = data.dislikes;
        this.likes = data.likes;
        this.loves = data.loves;
        this.comments = [data.comments];
    }


    static get allPosts(){
        const posts = postsData.map(post=> new Post(post))
        return posts;
    }

    static findById(id){
        try{
        const post = postsData.filter((post) => post.id === id)[0];
        const singlePost = new Post(post);
        return singlePost;
        }
        catch(err){
            throw new Error("No post is available with that id")
        }
    } 

    static create(post){
        const newPostId = postsData.length + 1;
        const newPost = new Post({ id: newPostId, ...post });
        postsData.push(newPost);
        return newPost;
    }


    
}

module.exports = Post;