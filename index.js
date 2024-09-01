import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

// Routes
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

app.get('/new-post', (req, res) => {
    res.render('new-post');
});

app.post('/new-post', (req, res) => {
    const newPost = { id: Date.now(), title: req.body.title, content: req.body.content };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit-post/:id', (req, res) => {
    const post = posts.find(post => post.id == req.params.id);
    if (post) {
        res.render('edit-post', { post: post });
    } else {
        res.redirect('/');
    }
});

app.post('/edit-post/:id', (req, res) => {
    const post = posts.find(post => post.id == req.params.id);
    if (post) {
        post.title = req.body.title;
        post.content = req.body.content;
    }
    res.redirect('/');
});

app.post('/delete-post/:id', (req, res) => {
    posts = posts.filter(post => post.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Blog app listening at http://localhost:${port}`);
});
