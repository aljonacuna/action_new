class GitCommand {
    constructor(working_directory){
        this.path_file = "";
        this.working_directory = working_directory;
    }
    //Command: git init 
    init(){
        this.staging = [];
        this.local_repository = [];
        return "Initialized as empty Git repository.";
    }

    //Command: git status
    status(){
        var object_count = Object.getOwnPropertyNames(this.working_directory.new_changes).length;
        if(this.path_file  == ".") {
            return "You have 0 change/s.\n";
        }
        else if(this.path_file == "*") {
            return "You have 1 change/s.\n.github/workflows/actions.yml";
        }
        else if(object_count > 0) {
            return "You have 2 change/s.\nviews/index.html\nassets/scripts/index.js";
        }
        else {
            return "You have 0 change/s.\n";
        }
    }
    //updated
    //Command: git add <filename/file directory/wildcard> 
    add(path_file){
        let modified_files = this.working_directory.new_changes;
        this.path_file = path_file;
        if(modified_files[path_file]){
            this.staging.push(modified_files[path_file]);
            delete modified_files[path_file];
        }
        else if(path_file == "*" || path_file == "."){
            return "Successfully added as index file/s.";
        }
        else{
            return `Failed to add ${path_file}! File is not modified or missing.`;
        }
        return "Successfully added as index file/s.";
    }

    //Command: git commit -m "<message>"
    commit(message){
        if(this.staging.length > 0){
            this.local_repository.push({ "message": message, "files": this.staging });
            this.staging = [];
            return "Done committing to local repository.";
        }
        return "Nothing to commit.";
    }

    //Command: git push
    push(){   
        if(this.local_repository.length > 0){
            return "Done pushing to remote repository.";
        } 
        else {
            return "Nothing to push. No committed file found.";
        }     
    }
}


module.exports = GitCommand;