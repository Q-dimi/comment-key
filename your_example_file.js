var comment_find = require('./index');
const keyWords = ['add', 'update']; 
const folders = [ 
    { folder: '/example_folder_1', files: 'all' }, 
    { folder: '/example_folder_2', files: 'all' }, 
    { folder: '/example_folder_3', files: ['index.js', 'account.js'] },
    { folder: '/example_folder_4', files: ['bank.js'] },
];
var result = comment_find(folders, keyWords);
var comments = result.comments; 
var errors = result.errors;
