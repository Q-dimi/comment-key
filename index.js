var fs = require('file-system');

function comment_keys(folders) {

    if(
        typeof(folders) !== 'object' || 
        Array.isArray(folders) == false
    ) { 
        throw new Error('an array was not passed');
    }

    var start = Date.now();
    var exported_comments = [];
    var file_info = {};
    var file_count = 0;
    var total_bits = 0;

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

        fs.recurseSync(folders[i].folder, folders[i].files == 'all' ? null : folders[i].files, (filepath, relative, filename) => {
            if(filename) { 
                var file_contents = iterate_through_file_text(filepath, exported_comments); 
                file_info[filepath] = { bytes: file_contents.bits / 8, comments: file_contents.comments_per_section };
                total_bits += file_contents.bits;
                file_count += 1;
            }
        })

    }

    return { 
        comments: exported_comments, 
        time_taken: ((Date.now() - start) / 1000), 
        files_traversed: file_count,
        bytes_traversed: total_bits / 8, 
        file_info: file_info, 
    }

} 

function iterate_through_file_text(filepath, exported_comments) { 

    var data = fs.readFileSync(filepath, 'utf8');
    var comments_per_section = [];
    var line_number = 1;
    var bits = 0;

    for(let i = 0; i < data.length; i++) { 

        bits += 8;

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

                bits += 8

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

            comments_per_section.push({ 
                linenumber: comment_line_number,
                comment: build_this_comment
            })

        }

    }

    return { 
        bits: bits, 
        comments_per_section: comments_per_section
    }

}

module.exports = comment_keys;