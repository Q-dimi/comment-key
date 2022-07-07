var comment_keys = require('./index');

const folders = [ 
    { folder: './example_1', files: 7 },
    { folder: './example_2', files: 'all' }, 
    { folder: './example_3', files: 'all' },
    { folder: './example_4', files: 'all' },
];

var result = comment_keys(folders);
var comments = result.comments; 
var errors = result.errors;

console.log('COMMENTS');
for(let i = 0; i < comments.length; i++) { 
    console.log((comments[i]));
}

console.log('ERRORS')
for(let i = 0; i < errors.length; i++) { 
    console.log((errors[i]));
}