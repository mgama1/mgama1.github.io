---
layout: post
title: my terminal commands
---
![image](https://user-images.githubusercontent.com/40968723/190875717-d998e11e-8155-45b3-9c03-8ec4e74aaabe.png)

<h3> As a daily linux user but not a sys admin or anything related, i thought to group all the commands that i find useful as a user </h3>  
my best friends are whois and alias. the first tells me a short describtion of a command that i'm not familliar with and the latter saves my time by shortening long complicated commands.



 obtain information specific to your Linux distribution.
```bash
lsb_release -a
```

change directory
```bash
cd
```

print name of current/working directory
```bash
pwd
```

list directory contents
```bash
ls
```

 concatenate files and print on the standard output(terminal)
```bash
cat filename
```

```bash
mkdir directory name
```

remove a file
```bash
rm filename
```

remove a directory
```bash
rm -r directory name
```

create a file
```bash
touch filename 
```


open or create a file in genome editor
```bash
gedit filename
```


package and compress (archive) files in .gz format

```bash
gzip filename

```

extract compressed files in a gz format
```bash
gunzip filename

```
package and compress (archive) files in .tar format

```bash
tar cvf filename.tar files
```

 extract files in .tar format

```bash
tar xvf filename.tar

```

 package and compress (archive) files in .zip format
```bash
zip -r filename.zip files

```

extract compressed files in a ZIP archive
```bash
unzip filename
```

aliasing a command

```bash

alias aliasedName='COMMAND'

```


display one-line manual page descriptions
```bash
whatis
```

display the user manual of any command that we can run on the terminal.
```bash
man
```
