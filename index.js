var fs = require('file-system');
function comment_find(folders, keyWords) { 
    var exported_comments = [];
    var exported_errors = [];
    if(typeof(folders) == 'object' && Array.isArray(folders) == true) { 
        for(let i = 0; i < folders.length; i++) {
            try {
                fs.recurseSync(folders[i].folder, (filepath, relative, filename) => {
                    if(filename) { 
                        const data = fs.readFileSync(filepath, 'utf8');
                        var string_contents = data.split(' ');
                        for(let i = 0; i < string_contents.length; i++) { 
                            for(let j = 0; j < keyWords.length; j++) { 
                                if(string_contents[i] == `//^*^${keyWords[j]}`) { 
                                    exported_comments.push({
                                        hint:  `control f this comment to find where it is`, 
                                        folder: filepath, 
                                        file: filename, 
                                        comment: `//^*^${keyWords[j]}`,
                                        message: string_contents[i+1].includes('-') ? string_contents[i+1] : `please make sure the format of your comment key is ' //^-^keyWord this-comment-is-for-adding-a-number- ' comments must have a ' - ' and end with ' - ' seperating the words`
                                    })
                                } 
                            }
                        }
                    }
                })
            } catch(err) { 
                exported_errors.push({ 
                    folder: folders[i].folder, 
                    file: 'none', 
                    error: err
                })
            }
        }
    }
    const result = { 
        comments: exported_comments, 
        errors: exported_errors 
    };
    exported_comments = [];
    exported_errors = [];
    return result
}
module.exports = comment_find;