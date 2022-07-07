var fs = require('file-system');

function comment_find(folders) {

    var exported_comments = [];
    var exported_errors = [];

    if(
        typeof(folders) == 'object' && 
        Array.isArray(folders) == true
    ) { 

        for(let i = 0; i < folders.length; i++) {

            try {

                fs.recurseSync(folders[i].folder, folders[i].files == 'all' ? null : folders[i].files, (filepath, relative, filename) => {

                    if(filename) { 

                        var data = fs.readFileSync(filepath, 'utf8');
                        data = data.split('');

                        var line_number = 1;

                        for(let i = 0; i < data.length; i++) { 

                            if(data[i] == '\n') { 
                                line_number = line_number + 1;
                            }

                            if(
                                data[i] == '/' && 
                                data[i+1] == '/' && 
                                data[i+2] == '^' && 
                                data[i+3] == '*' && 
                                data[i+4] == '^' && 
                                data[i+5] == '('
                            ) { 

                                var count = 0
                                var stop = 255;
                                var start = i + 5;
                                var build_this_comment = '';

                                while(true) { 

                                    i++;

                                    if(data[start] == '\n') { 
                                        line_number = line_number + 1;
                                    }

                                    if(data[start] == ')') { 
                                        build_this_comment += ')';
                                        break;
                                    }

                                    if(count == stop) { 
                                        build_this_comment += '...comments can only be 255 characters)';
                                        break;
                                    }

                                    build_this_comment += data[start];
                                    start += 1;
                                    count += 1;

                                }

                                exported_comments.push({
                                    line_number: line_number,
                                    folder: filepath,
                                    comment: build_this_comment.split('-').join(' ')// /:-/|
                                })

                            }
                        }
                    }
                })

            } catch(err) { 
                exported_comments.push({
                    folders: folders[i].folder,
                    error: err
                })
            }
        }
    }

    return { 
        comments: exported_comments, 
        errors: exported_errors
    }

} 

module.exports = comment_find;