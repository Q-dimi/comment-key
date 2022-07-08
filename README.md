# comment_keys

Write comments with a specific syntax so that your team members know where to go and what to do. Comments must be written in this syntax..

```js
//^*^(your comment here)
```

```js
const comment_keys = require("comment_keys");

const folders = [
  { folder: "./example_1", files: ["wow.js"] },
  { folder: "./example_2", files: "all" },
  { folder: "./example_3", files: "all" },
  { folder: "./example_4", files: "all" },
  { folder: "./", files: ["README.md", "package.json"] },
];

try {
  var comments = comment_keys(folders);
  for (let i = 0; i < comments.length; i++) {
    console.log(comments[i]);
  }
} catch (err) {
  console.log(err.message);
}

//folders must be an array of objects containing folder and files

//folder must be a string representing the folder to search through

//files must be either an array of files as strings or a single string. If a single string the keyword must be 'all' for all files and folders traversed

//the example above shows every possibility
```

# use case

You are a manager going through all of your files and making updates. You write comments everywhere with the syntax (above) so that when your devs login, they see the list of comments and know where to go and what they need to do. Below each comment you should have a larger comment without the syntax that describes what the problem is in detail.

# how it works

Uses the file system module to traverse a set of directories looking for '//^\*^('. Once '//^\*^(' is found, the comment gets built up and is pushed to the comment set.
