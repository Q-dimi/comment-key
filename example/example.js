var comment_keys = require('../index');

const folders = [ 
    { folder: './example', files: 'all' },
];

var result = [];

try {
    result = comment_keys(folders);
} catch(err) { 
    console.log(err.message)
}

//comments
console.log('COMMENTS:');
for(let i = 0; i < result.comments.length; i++) { 
    console.log((result.comments[i]));
}