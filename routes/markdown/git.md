### Git

#### Git

This is a program used for code versioning.

It saves you from doing `file.txt`, `file-updated.txt`, `file-revision-2.txt`, `file-FINAL.txt`... Instead, all of this is tracked in the background.

This program usually is built-in in all modern Linux distros, or you can install it with this:

```bash
sudo apt install git
```

#### .gitignore

This is a simple file where you list which folders and files you do NOT want to save.

The file has to be named `.gitignore` and placed in the root of the project folder.

Putting this inside the file...

```text
index.html
```

Means index.html will not be saved with git.

#### Git commands

To start using Git, initialize it inside your project folder:

```bash
git init
```

This will create a .git folder (invisible), inside your project, where all the changes are stored. This is called a repository, repo for short.

Each repo has its own configurations. You can see them with:

```bash
git config --list
```

Here are the essential configurations you need to add:

```bash
# Configure owner of changes just for current repo
git config user.email "codingiseasydotlol@gmail.com"
git config user.name "codingiseasylol"
```

Github contributions count only if the repo email is the same as the github email.

![](pics/topics/git-init.jpg)

You can check which files are new (untracked) or unsaved (unstaged) with this command:

```bash
git status
```

To save something, first you need to mark the files as "to be saved" i.e. "tracked" or" staged":

```bash
git add .    # . means everything in current directory
```

The actual saving is done like this:

```bash
git commit -m "Any message you want for this save"
```

Here's how this looks in the terminal:

![](pics/topics/git-commit.jpg)

You can do as many saves as you want.

Let's change our file with our VS Code editor.

![](pics/topics/git-change.jpg)

You can compare the changes between the saved file and the updated file with:

```bash
git diff
```

![](pics/topics/git-diff.jpg)

Save the changes like you did before:

![](pics/topics/git-commit2.jpg)

You can see all the saves with this command:

```bash
git log
```

Notice the weird random characters (hash) in yellow. These are the names of the saves (commits).

![](pics/topics/git-log.jpg)

#### Github

This is where you upload your code, which you can share with others. Like Google Drive is for files and pictures.

Github is NOT part of Git, it just works with it. There are other websites that offer the same services, like Gitlab and Bitbucket... Github is just the most popular one.

If you want to upload your code there, which is HIGHLY recommended, you can create an account here:

[https://github.com](https://github.com)

Your Github username and email MUST match the ones you used in your Git configuration, so that the commits can show up on Github. I'm talking about these:

```bash
git config user.email "codingiseasydotlol@gmail.com"
git config user.name "codingiseasylol"
```

This is what your Github account will look like:

![](pics/topics/github.jpg)

#### Github password

After you've created your account, you will need to create a separate password for uploading your code, like this:

1. Go to...

```text
Settings / Developer Settings / Personal Access Token / Tokens (classic)
```

2. Click on Generate New Token (classic)...

![](pics/topics/github-token-settings.jpg)

3. Add a note. Select no expiration. Toggle the repo checkbox. Click on Generate token...

![](pics/topics/github-token-creation.jpg)

4. Save the token somewhere because you won't be able to see it again.

![](pics/topics/github-token-created.jpg)

#### Github repository

Now that you have an account and password (token), you can finally upload your code to github.

First you need to create a new repository (repo) via the top menu...

![](pics/topics/github-new-repo.jpg)

Fill up the repo details...

![](pics/topics/github-create-repo.jpg)

And that's it. The repo you've created is now empty, and needs some code to be uploaded.

![](pics/topics/github-repo-empty.jpg)

You will be asked for the Github password, so to save it for future saves, use this command:

```bash
git config credential.helper store
```

It saves the password in a `.git-credentials` file.

Since we already have the code that we saved with Git, we can upload that.

The first time you upload code, you use these commands, shown in the empty repo at the bottom:

```bash
git remote add origin https://github.com/codingiseasylol/todo-file.git
git branch -M main
git push -u origin main
```

After that, you only use:

```bash
git push
```

![](pics/topics/git-push.jpg)

After code is uploaded, your repo will look like this:

![](pics/topics/github-repo.jpg)

You can download repos like this:

```bash
git clone https://github.com/codingiseasylol/todo.git
```
