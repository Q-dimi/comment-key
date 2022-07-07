var comment_find = require('./index');

const folders = [ 
    { folder: './example_1', files: ['wow.js'] },
    { folder: './example_2', files: [] }, 
    { folder: './example_3', files: ['account.js', 'bank.js'] },
    { folder: './example_4', files: 'all' },
];

var result = comment_find(folders);
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