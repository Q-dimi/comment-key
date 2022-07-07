var fs = require('file-system');

var exported_comments = [];
var exported_errors = [];

function comment_find(folders, keyWords) { 

    //folder that was found in folder while traversing... 
    if(typeof(folders) == 'object' && Array.isArray(folders) == false && folders.single == true) { 

        fs.recurseSync(folders.folder, function(filepath, relative, filename) {

            if(filename) { 

                fs.readFileSync(filename, 'utf8', function(err, data) {

                    if(err) { 
                        exported_errors.push({ 
                            folder: filepath, 
                            file: filename, 
                            error: err
                        })
                    }

                    var string_contents = data.split(' ');

                    for(let i = 0; i < string_contents.length; i++) { 
                        for(let j = 0; j < keyWords.length; j++) { 
                            if(string_contents[i] == `//^-^${keyWords[j]}`) { 
                                exported_comments.push({ 
                                    hint: 'control f this comment to find where it is', 
                                    folder: filepath, 
                                    file: filename, 
                                    comment: `^-^${keyWords[j]}`,
                                    message: string_contents[i+1].includes('-') ? string_contents[i+1] : 'please make sure the format of your comment key is (//^-^keyWord this-comment-is-for-adding-a-number) comments must have a - seperating the words'
                                })
                            } 
                        }
                    }

                });

            } else { 

                comment_find({folder: filepath, single: true}, keyWords);

            }

        });

        return 'successfully travered inner set';

    }

    //main folder traversal
    for(let i = 0; i < folders.length; i++) {

        if(folders[i].files == 'all') {

            fs.recurseSync(folders[i].folder, function(filepath, relative, filename) {

                if(filename) { 

                    fs.readFileSync(filename, 'utf8', function(err, data) {

                        if(err) { 
                            exported_errors.push({ 
                                folder: filepath, 
                                file: filename, 
                                error: err
                            })
                        }

                        var string_contents = data.split(' ');

                        for(let i = 0; i < string_contents.length; i++) { 
                            for(let j = 0; j < keyWords.length; j++) { 
                                if(string_contents[i] == `//^-^${keyWords[j]}`) { 
                                    exported_comments.push({ 
                                        hint: 'control f this comment to find where it is', 
                                        folder: filepath, 
                                        file: filename, 
                                        comment: `//^-^${keyWords[j]}`,
                                        message: string_contents[i+1].includes('-') ? string_contents[i+1] : 'please make sure the format of your comment key is (//^-^keyWord this-comment-is-for-adding-a-number) comments must have a - seperating the words'
                                    })
                                } 
                            }
                        }

                    })

                } else { 

                    comment_find({folder: filepath, single: true}, keyWords);

                }

            });

        } else { 

            if(typeof(folders[i].files) !== 'object' || Array.isArray(folders[i].files) == false) { 

                exported_errors.push({ 
                    folder: folders[i].folder, 
                    file: JSON.stringify(folders[i].files), 
                    error: 'please pass an array as the argument for the files within the folder you want checked'
                });

                continue;

            }   

            fs.recurseSync(folders[i].folder, folders[i].files, function(filepath, relative, filename) {

                if(filename) { 

                    fs.readFileSync(filename, 'utf8', function(err, data) {

                        if(err) { 
                            exported_errors.push({ 
                                folder: filepath, 
                                file: filename, 
                                error: err
                            })
                        }

                        var string_contents = data.split(' ');

                        for(let i = 0; i < string_contents.length; i++) { 
                            for(let j = 0; j < keyWords.length; j++) { 
                                if(string_contents[i] == `//^-^${keyWords[j]}`) { 
                                    exported_comments.push({
                                        hint: 'control f this comment to find where it is', 
                                        folder: filepath, 
                                        file: filename, 
                                        comment: `^-^${keyWords[j]}`,
                                        message: string_contents[i+1].includes('-') ? string_contents[i+1] : 'please make sure the format of your comment key is (//^-^keyWord this-comment-is-for-adding-a-number) comments must have a - seperating the words'
                                    })
                                } 
                            }
                        }

                    });

                } else { 

                    comment_find({folder: filepath, single: true}, keyWords);

                }

            });

        }
    }

    const result = { comments: exported_comments, errors: exported_errors };
    exported_comments = [];
    exported_errors = [];
    return result

}

module.exports = comment_find;