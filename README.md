# comment_find

Write comments with a specific syntax so that your team members can know where to go and what to do. Comments must be written in this syntax //^\*^(your-comment-here)

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

You are a manager going through all of your files and making updates. You write comments so that when your devs login, they know where to go and what to do.
