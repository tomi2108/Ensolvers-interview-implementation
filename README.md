Ensolvers to do list
//
Developer: Tomás Sánchez Negrette

The implementation consists of a front-end app, a back-end app and a data base.

On this project is a script included to run the app on linux/macOS that use apt.

You can run the script with the command "./ensolversscript $port"
Where $port is the local port that will be used for the server.
You may be asked for sudo permission / sudo password


///IMPORTANT the app needs at least Node.js v14



The script asumes you have run:

sudo apt-get update

asudo apt-get upgrade



The script will do the following in this order:

1- Install nodejs

2- Install npm

3- Install git

4- Install mysql

5- Start mysql and flush privileges to change the root password

6- Restart mysql

7- Create a data base named "ensolvers"

8- Create tables and insert admin into the users

9- Create a folder por the project in the current directory

10- Pull the project from github

11- Set some files to configure the app connection with the server and database

12- Install all dependencies for the back-end of the app

13- Open a new terminal and run the back-end/server app

14- Install al dependences for the development of the front-end/client app

15- build and run the front-end app



At the end of the script this should happen:

1- All dependencies are installed

2- ensolvers Database should be set up

3- Server should be running in another terminal in the port especified

4- Server should be connected to the newly created database

5- Front-end app should be running and a link to it should be displayed in the terminal

6- Front-end should be connected to the server and ready to use.



**note: The script downloads all the code for the project and builds it. Only the build is necessary
for the app to work but this is done in order to have the latest version of the app.




The default user to login to the app is:

username: admin

password: admin






herokuAPP-front-end: https://ensolvers-to-do-list-tsn.herokuapp.com/


**note: for the heroku app to work, you need to run the server locally on the port 3001 since the heroku app is only the front-end and database, and the heroku app was deployed without the script that configures both the server and the client to connect to the same port. The heroku app is configured to look for a local server on port 3001.
This can be done by making sure the serverConfig.json on the root directory has "port:3001" and running "npm start" on the server directory.


The dependencies are:


Client/front-end:


Axios: ^0.26.0

Bootstrap: ^5.1.3

React: ^17.0.2

React-bootstrap: ^2.1.2


Server/back-end:

Body-parser: ^1.19.2

Cors: ^2.8.5

Express: ^4.17.3

Mysql: ^2.18.1



Tools used during development:

MySql Workbench -- to configure data base

Firefox -- to test and debug the app

Git -- to manage versions

vsCode -- to write the code and develop the app

Sublime Text -- to write the script

Oracle VirtualBox -- to test the script in a virtual machine





githubRepository: https://github.com/tomi2108/Ensolvers-interview-implementation
