var comment_keys = require('./index');

const folders = [ 
    { folder: './example_1', files: ['wow.js'] },
    { folder: './example_2', files: 'all' }, 
    { folder: './example_3', files: 'all' },
    { folder: './example_4', files: 'all' },
    { folder: './', files: ['README.md', 'package.json'] },
];

try {
    var comments = comment_keys(folders);
    for(let i = 0; i < comments.length; i++) { 
        console.log((comments[i]));
    }
} catch(err) { 
    console.log(err.message)
}