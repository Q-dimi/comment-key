var fs = require('file-system');
function comment_find(folders, keyWords) { 
    var exported_comments = [];
    var exported_errors = [];
    if(typeof(folders) == 'object' && Array.isArray(folders) == true) { 
        for(let i = 0; i < folders.length; i++) {
            try {
                fs.recurseSync(folders[i].folder, (filepath, relative, filename) => {
                    if(filename) { 
                        var data = fs.readFileSync(filepath, 'utf8');
                        console.log(filepath);
                        console.log(data);
                        //check for keys here and push to comments - NOT DONE
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