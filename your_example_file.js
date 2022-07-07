var comment_find = require('./index');

const keyWords = ['add', 'update', 'delete', 'team1', 'team2']; 

const folders = [ 
    { folder: './example_1', files: 'all' },
    { folder: './example_2', files: 'all' }, 
    { folder: './example_3', files: 'all' },
    { folder: './example_4', files: 'all' },
];

var result = comment_find(folders, keyWords);
console.log(result);
var comments = result.comments; 
var errors = result.errors;

for(let i = 0; i < comments.length; i++) { 
    console.log((comments[i]));
}

for(let i = 0; i < errors.length; i++) { 
    console.log((errors[i]));
}