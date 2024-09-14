### Linux

#### Linux

Operating system like Windows, but free. 90% of all servers run on Linux. Your's will too.

There are many versions of it called distros, the most popular one is Ubuntu.

You can either install Ubuntu directly as an OS on your computer instead of Windows...

Or, even better, use it from inside Windows via terminals with something called WSL (Windows Subsystem for Linux).

#### WSL (Windows Subsystem for Linux)

Allows you to run Linux inside Windows via terminals.

To install it, first you have to enable it:

```text
Start Menu / Turn Windows features on or off / Enabling "Windows Subsystem for Linux"
```

![](pics/topics/wsl-windows-features.jpg)

![](pics/topics/wsl-enable.jpg)

Then you can download it via the Microsoft Store...

![](pics/topics/wsl-microsoft-store.jpg)

![](pics/topics/wsl-microsoft-store-ubuntu-download.jpg)

Open it...

![](pics/topics/wsl-microsoft-store-ubuntu-open.jpg)

Wait to finish installing...

![](pics/topics/wsl-microsoft-store-ubuntu-terminal.jpg)

Enter a username...

![](pics/topics/wsl-install-user.jpg)

And that's it! You no have Linux installed inside Windows.

![](pics/topics/wsl-install-finished.jpg)

Linux (Ubuntu) is installed in Windows here:

```text
C:\Users\User\AppData\Local\lxss
```

You can access the Windows C: drive inside the Linux terminal like this:

```bash
cd /mnt/c
```

#### Terminal

It allows you to control a computer with text commands, instead of a mouse and a User Interface.

It's also called CLI (Command Line Interface) or shell.

At first, it looks stupid and ugly to work like this, BUT TRUST ME, you will LOVE it later. It's insanely powerful.

Normally, you open folders and files by double-clicking them...

![](pics/topics/wsl-terminal-navigation-windows.jpg)

But, you can to the same with a terminal:

![](pics/topics/wsl-terminal-navigation.jpg)

Here are the most useful commands for...

Navigation

```bash
ls -a               # List ALL folders and files

cd folder           # Go inside folder
cd ..               # Go back outside folder

.                   # Shorthand for current directory
cd ~                # Go to your Linux "desktop"
cd /                # Go to the Linux "C:" directory

cat file          # Print file content
less file         # Display file content
```

Creating folders and files

```bash
mkdir folder              # Create folder
touch file.txt            # Create file

cp file.txt file2.txt     # Create a copy
rm file2.txt              # Delete file
mv file file3             # Rename file
```

Editing files

```bash
nano file.txt     # Edit file with nano

# Save with CTRL + x then y then Enter
# Exit with CTR + x then n

vim file.txt      # Edit file with vim

# Save with ESC then :wq then Enter
# Exit with ESC then :q then Enter
```

Stop a command

```text
CTRL + c
```

#### Users

You can create a new user like this:

```bash
adduser USERNAME
```

And swith between users with:

```bash
su - USERNAME
```

There are 2 user types. One is a regular one, like the one you created during installation. The other one is called `root`, which is basically god in the OS.

`root` has full control over Linux, and it is **NOT** advisable to run commands with it. You should use your own username.

Why am I telling you this? Because sometimes commands need `root` access to execute commands, and you do it with `sudo` which stands for `super user do`.

Like changing a username...

```bash
sudo usermod -l NEW_USERNAME OLD_USERNAME
```

Or changing a password.

```bash
sudo passwd
```

#### binaries

All of these commands are actually mini programs, called binaries or executables, which are just files.

So, instead of doing this command to list all files:

```bash
ls
```

You can manually execute it by running the actual binary:

```text
/usr/bin/ls
```

This is where it's located. You can check where other commands are located with this:

```text
which COMMAND_NAME
```

The connections between commands and binaries is defined in an environment variable called `$PATH`.

#### PATH

`$PATH` is an enviroment variable which includes a list of important DIRECTORIES that include program executables i.e. allows you to run commands.

Each time you run a command, the shell checks all the DIRECTORIES in the `$PATH` variable if they have the executable.

The value of `$PATH` looks like this:

```text
/home/name/.nvm/versions/node/v20.13.1/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
```

It's just a list of folders separated by `:` i.e. this:

```text
/home/name/.nvm/versions/node/v20.13.1/bin
/usr/local/sbin
/usr/local/bin
/usr/sbin
/usr/bin
/sbin
/bin
```

Why, am I telling you this?

Because if you get a "command not found" error when executing a command, it means it's either no installed i.e not in the directories listed in `$PATH`, or the directory itself is not listed in the `$PATH`.

You can add something to it with:

```bash
export PATH=$PATH:/usr/hitech/picc/9.82/bin
```

#### Services

Services are programs/binaries/executables that run continuously in the background.

You start them with:

```bash
sudo service SERVICE_NAME start
```

And end them with:

```bash
sudo service SERVICE_NAME stop
```

You can check if they are running with:

```bash
sudo service SERVICE_NAME status
```

#### apt (Advanced Packaging Tool)

Terminal command used to install programs/binaries/executables, also called packages.

Just like Windows, Linux has its own programs, and they are all located in one central place you download them from, unlike Windows wher you have to look for the programs.

First, update the list of available programs:

```bash
sudo apt update
```

Then install a specific program with:

```bash
sudo apt install PACKAGE_NAME
```

You can update already installed programs with this:

```bash
sudo apt upgrade
```

#### Update

You can use this single command to both update and upgrade the packages:

```bash
sudo apt update && sudo apt upgrade
```
