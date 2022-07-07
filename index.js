var fs = require('file-system');
function comment_find(folders, keyWords) { 
    var exported_comments = [];
    var exported_errors = [];
    if(typeof(folders) == 'object' && Array.isArray(folders) == true) { 
        for(let i = 0; i < folders.length; i++) {
            fs.recurseSync(folders[i].folder, (filepath, relative, filename) => {
                if(filename) { 
                    fs.readFile(filepath, 'utf8', (err, data) => {
                        if(err) { 
                            exported_errors.push({ 
                                folder: filepath, 
                                file: filename, 
                                error: err
                            })
                        }
                        var string_contents = data.split(' ');
                        var line_number = 0;
                        for(let i = 0; i < string_contents.length; i++) { 
                            line_number = string_contents[i] == '/n' ? line_number += 1 : line_number;
                            for(let j = 0; j < keyWords.length; j++) { 
                                if(string_contents[i] == `//^*^${keyWords[j]}`) { 
                                    console.log(string_contents[i+1]); //split and get until last thing and if - good else, delelte
                                    exported_comments.push({ //?not pushing
                                        hint:  `control f this comment to find where it is - ${line_number}`, 
                                        folder: filepath, 
                                        file: filename, 
                                        comment: `//^*^${keyWords[j]}`,
                                        message: string_contents[i+1].includes('-') ? string_contents[i+1] : `please make sure the format of your comment key is ' //^-^keyWord this-comment-is-for-adding-a-number- ' comments must have a ' - ' and end with ' - ' seperating the words`
                                    })
                                } 
                            }
                        }
                    })
                }
            });
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