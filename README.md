# comment_find

Write comments with a specific syntax so that your team members know where to go and what to do. Comments must be written in this syntax

```js
//^*^(your-comment-here)
```

```js
const comment_find = require("comment-find");

const folders = [
  { folder: "./example_1", files: ["wow.js"] },
  { folder: "./example_2", files: [] },
  { folder: "./example_3", files: ["account.js", "bank.js"] },
  { folder: "./example_4", files: "all" },
];

var result = comment_find(folders);
var comments = result.comments;
var errors = result.errors;

console.log("COMMENTS");
for (let i = 0; i < comments.length; i++) {
  console.log(comments[i]);
}

console.log("ERRORS");
for (let i = 0; i < errors.length; i++) {
  console.log(errors[i]);
}
```

# use case

You are a manager going through all of your files and making updates. You write comments everywhere with the syntax (above) so that when your devs login, they know where to go and what to do. Below each comment you should have a larger comment without the syntax that describes more what the problem is.

# how it works

Uses the file system module to traverse a set of directories and for each file, searches for the correct syntax of the comment. Once '//^\*^(' is found, the comment gets built up and pushed to the comment set.
