# HotelMiniProject
UI Session Final Project

Link: 13.232.12.205:3000

PLease follow these steps to start the app - 

1) Install NodeJs (https://nodejs.org/en/download/).
2) Install MongoDb Community (https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.2-signed.msi/download).
4) Clone this repository on your system.
5) Open a terminal inside the 'HotelsMiniProject' folder.
6) Enter the following command only once on a new system to create the database - "node database.js".
7) Enter the following command to start the app - "npm start".
 
Contributors: 
1) Saurabh : WebUI, JQuery
2) Nihit   : WebUI, Responsiveness, CSS
3) Swinal  : WebUI
4) Utkarsh : BackboneJS, UnderScoreJS, Front Page designing
5) Swapnil : JQuery
6) Ayush : Node, Express, MongoDB
7) Paarth   : Node, Express, MongoDB
8) Shreea - Web Accessibility
9) Ashwarya : Deployment, Integration, Automation
10) Gurbaksh : Deployment, Integration, Automation
 
 
-----------------------------------------------------------Deployment Readme -----------------------------------------------------------
 
Git Usage-Used to create a repo and upload the project.
AWS Usage- EC2 used to create an instance.
Jenkins Usage-Used to automate the process so that with every new feature added with git push changes are deployed to the server as well. 


1) From the AWS Management Console, launch the Amazon EC2 instance from an Amazon Machine Image (AMI) that has the base operating system you want. This project uses an Amazon Linux 64-bit AMI.
2) Choose a security group that will allow SSH access as well as configure ports 80, 143, 22 and 3000 for HTTP, HTTPS, SSH and Node.
3) Connect to the instance via SSH.
4) Install the required packages as mentioned above, on the machine.
5) Run the required server as mentioned above in Readme.
6) Download Generic package of Jenkins from https://jenkins.io/
7) Run command 
                    java -jar jenkins.war
  The default port where jenkins run is
                     http://localhost:8080
8)Open jenkins using the address above in your browser.
9)Login and add a new item and in the configurations click on Git and add your git repo and on Poll SCM add the required schedule.
10)For Build add the required commands on Windows Batch Command.
          Steps-
          1)Pull the git repo (git pull <repository>)
          2)Copy the repo to EC2 server(pscp --recursive -i "key_pair_name.ppk" source_project_address  Destination_remote_server_address)
11)Save and apply the changes.
12)Provide an Elastic ip to the AWS instance.
13)Now use that ip to overview the project.

