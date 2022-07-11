var comment_keys = require('../index');

const folders = [ 
    { folder: './example/example_1', files: ['wow.js'] },
    { folder: './example/example_2', files: 'all' }, 
    { folder: './example/example_3', files: 'all' },
    { folder: './example/example_4', files: 'all' },
    { folder: './', files: ['README.md', 'package.json'] },
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

// //total comments
// console.log('comments: ' + result.total_comments);

// //total time
// console.log('time taken: ' + result.total_time + ' seconds');

// //total files 
// console.log('files traversed: ' + result.total_files); 

// //total bytes
// console.log('total bytes: ' + result.total_bytes);

// //file sizes
// console.log('FILE INFO:');
// console.log(result.file_info);