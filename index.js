var fs = require('file-system');

function comment_keys(folders) {

    if(
        typeof(folders) !== 'object' || 
        Array.isArray(folders) == false
    ) { 
        throw new Error('an array was not passed');
    }

    var exported_comments = [];
    var start = Date.now();

    for(let i = 0; i < folders.length; i++) {

        var errors = '';

        if(typeof(folders[i].folder) !== 'string') { 
            errors += 'folder: folder must be a string \n';
        }

        if(
            typeof(folders[i].files) !== 'string' && 
            (typeof(folders[i].files) !== 'object' ||
            Array.isArray(folders[i].files == false))
        ) { 
            errors += 'files: files must be a string or array \n';
        }

        if(
            typeof(folders[i].files) == 'string' && 
            folders[i].files !== 'all'
        ) {  
            errors += 'files: if files is a string, the keyword must be (all) for all files and folders \n';
        }

        if(errors.trim().length > 0) { 
            errors += `index: ${i}`;
            throw new Error(errors);
        }

        fs.recurseSync(
            folders[i].folder, 
            folders[i].files == 'all' ? null : folders[i].files, 
            (filepath, relative, filename) => {
            if(filename) { 
                iterate_through_file_text(
                    filepath, 
                    exported_comments
                ); 
            }
        })

    }

    var end_time = Date.now() - start;
    end_time = end_time / 1000;
    console.log(end_time + ' seconds');

    return exported_comments;

} 

function iterate_through_file_text(filepath, exported_comments) { 

    var data = fs.readFileSync(filepath, 'utf8');

    var line_number = 1;

    for(let i = 0; i < data.length; i++) { 

        if(data.charAt(i) == '\n') { 
            line_number += 1;
        }

        if(
            data.charAt(i) == '/' && 
            data.charAt(i+1) == '/' && 
            data.charAt(i+2) == '^' && 
            data.charAt(i+3) == '*' && 
            data.charAt(i+4) == '^' && 
            data.charAt(i+5) == '('
        ) { 

            var count = 0
            var stop = 255;
            var start = i + 5;
            var build_this_comment = '';
            var comment_line_number = line_number;

            while(true) { 

                if(data.charAt(start) == '\n') { 
                    line_number += 1;
                }

                if(data.charAt(start) == ')') { 
                    build_this_comment += ')';
                    i = start;
                    break;
                }

                if(count == stop) { 
                    build_this_comment += '...comments can only be 255 characters)';
                    i = start;
                    break;
                }

                build_this_comment += data.charAt(start);
                start += 1;
                count += 1;

            }

            exported_comments.push({
                filepath: filepath,
                linenumber: comment_line_number,
                comment: build_this_comment
            })

        }
    }

}

module.exports = comment_keys;