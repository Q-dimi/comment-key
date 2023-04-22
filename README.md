# comment-key

Comment-key will search through all your directories and files looking for comments with a specific syntax. Specifiy one directory and all inner directories and files will be checked.

```sh
npm i comment-key
```

# Syntax

```js
//^*^(your comment here)
```

# Examples

```js
//^*^(add a button here)

/*
  please make sure to add a button that updates the shopping cart
*/

//^*^(update this regular expression)

/*
  update the regular expression to accept numbers 1-9
*/

//^*^(Im not sure what this is? can someone please explain in this key)

/*
  im not sure what this function does...
*/

//^*^(I do not understand. someone send an email to jdoe@mail.com)

/*
  I dont know how this works. Can someone send me an email.
*/
```

# Getting Started

```js
const comment_keys = require("comment-key");

/*
   { folder: './my_folder', files: ([]), ('all'), (['a.js', 'b.js']) }
   'all' searches through all directories and files
*/

const folders = [
  { folder: "./cron", files: "all" },
  { folder: "./db", files: "all" },
  { folder: "./routes", files: "all" },
  { folder: "./public", files: "all" },
  { folder: "./views", files: "all" },
  { folder: "./", files: ["app.js"] },
];

var result = [];

try {
  result = comment_keys(folders);
} catch (err) {
  console.log(err.message);
}

//comments
for (let i = 0; i < result.comments.length; i++) {
  console.log(result.comments[i]);
  //filepath
  //linenumber
  //comment
}

//time taken /s
console.log(result.time_taken);

//files traversed
console.log(result.files_traversed);

//bytes traversed
console.log(result.bytes_traversed);

//file info
console.log(result.file_info);
/*
  { 
    filepath: { 
      file_size: bytes 
      comments: array
    }, 
    filepath: { 
      file_size: bytes 
      comments: array
    },  
  }
*/
```
