//type 'node example/example.js'

var comment_keys = require('../index');

const folders = [ 
    { folder: './example/example_1', files: ['wow.js'] },
    { folder: './example/example_2', files: 'all' }, 
    { folder: './example/example_3', files: 'all' },
    { folder: './example/example_4', files: 'all' },
    { folder: './', files: ['README.md', 'package.json'] },
];


var comments = [];

try {
    comments = comment_keys(folders);
} catch(err) { 
    console.log(err.message)
}

for(let i = 0; i < comments.length; i++) { 
    console.log((comments[i]));
}
