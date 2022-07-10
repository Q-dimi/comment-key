# comment-key

comment-key will search through all your directories and files looking for comments with a specific syntax. Specifiy one directory and all inner directories and files will be checked. Increases developer productivity. Works well when using docker or github and sharing projects. Great for asking and answering questions and leaving contact info.

```sh
npm install comment-key
```

Comments must be written in this syntax..

```js
//^*^(your comment here)

/*
  optional details about the comment
/*
```

```js
const comment_keys = require("comment-key");

const folders = [
  { folder: "./cron", files: "all" }, // { folder: './my_folder', files: ([]), ('all'), (['a.js', 'b.js']) }
  { folder: "./db", files: "all" }, // 'all' searches through all directories and files
  { folder: "./routes", files: "all" },
  { folder: "./public", files: "all" },
  { folder: "./views", files: "all" },
  { folder: "./", files: ["app.js"] },
];

var comments = [];

try {
  comments = comment_keys(folders);
} catch (err) {
  console.log(err.message);
}

for (let i = 0; i < comments.length; i++) {
  console.log(comments[i]);
  //linenumber
  //filepath
  //comment
}
```

# Use case

You are a manager going through all of your files and making updates. You write comments everywhere with the syntax (above) so that when your devs login, they see the list of comments and know where to go and what they need to do. You are a junior who is stuck on a problem so you leave a comment key with your email and the question you have. You are clicking around in your application and find a few bugs so you write some comment keys to handle them later.
Below each comment you should have a larger comment without the syntax that describes what the problem is in detail.

# How it works

Uses the file system module to traverse a set of directories looking for '//^\*^('. Once '//^\*^(' is found, the comment gets built up and is pushed to the comment set.
