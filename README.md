# Welcome to School APP


<center><img src="./public/favicon.png"/></center>


This is the last project for the FullStackDeveloper Bootcamps at GeeksHubs Academy. The APP is a platform that brings closer schools, students and parents. 

  ## Content 📝
  <ol>
    <li><a href="#about-the-project">About the project</a></li>
    <li><a href="#stack">Stack</a></li>
    <li><a href="#deploy-🚀">Deploy</a></li>
    <li><a href="#local-installation">Installation</a></li>
    <li><a href="#endpoints">Endpoints</a></li>
    <li><a href="#problems-solutions">Problems solutions</a></li>
    <li><a href="#future-features">Future features</a></li>
    <li><a href="#development">Development</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>

## About the project

This platform is oriented to host different schools. Each school will have his own admin and that admin will create the "tree" of that school.

To create that "tree" the admin can create stages and add courses to these stages. Subjects can also be created and added to each course.

One of the key of the app is that users must be registered by the admin. Familys must give the data needed and the administrator will register each user. Immediately after the user is registered an email will be automatically sent by the app with the credentials. Users can be either teachers, parents, students or personal of the school.

Depending on the role of the user you can access different content.

Parents and Students can access:
- Calendar: with events as examns, works, vacations, etc. As admin or teacher you can use filters, if you are a parent or student you only can see your own events.
- Messages: a chat in which you can send and recieve messages to teachers and personal of the center.
- Nofitications: an official channel of communication of the school with students and parents.

Teachers will also have access to:
- Events: to create the events that will appear on the calendar. Fix dates to next examen or a work that has to be made.

Admin will have full access to last content and:
- Subjects: to create new subjects for the school.
- Stages: add stages that are imparted on the school (like: infantil, primaria, ESO, etc.)
- Courses: to add courses to the mentioned stages.
- Register: to create new users of the APP for the respective school.
- Users: to search for users and see their information.

***Although made it to see it correctly on mobile devices. Administration pages such as Events, Register or Courses are meant to be used on a large screen. Pages meant to be used for parents and students as Messages or Calendar were designed as mobile first.

<div style="display: flex; justify-content: space-around;">
<center><img src="./public/sample1.gif"/></center>
<center><img src="./public/sample2.gif"/></center>
</div>

## Stack

<div align="center">
<a href="">
    <img src="https://img.shields.io/badge/React-000000?style=for-the-badge&logo=react&logoColor=White" alt="React" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/css3-FC9521.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</a>
<a href="">
    <img src= "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
</a>
<a href="">
    <img src="https://img.shields.io/badge/zustand-%23593d88.svg?style=for-the-badge&logo=zustand&logoColor=white" alt="Zustand" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/JWT-287606?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white" alt="Trello" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/photoshop-%2331A8FF.svg?style=for-the-badge&logo=adobe%20photoshop&logoColor=white" alt="JWT" />
</a>
<a href="">
    <img src="https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=whitee" alt="AWS" />
</a>
 </div>

## Deploy 🚀
<div align="center">
    <a href="https://master.d2kvajiisyme6h.amplifyapp.com/"><strong>https://master.d2kvajiisyme6h.amplifyapp.com/</strong></a>🚀🚀🚀
</div>


## Local installation

1. Clone the repository
` $ git clone https://github.com/Javi-Gallego/SchoolsAPP_Front.git `
2. Install dependencies
` $ npm install `
3. Run React project
` $ npm run dev `

Unfortunately, the server is hosted on a free site and it is very likely that is not online the moment you want to see this project. In this link you have the repository (an Express made server working with a MySQL database) and the instructions to install it locally:
https://github.com/Javi-Gallego/SchoolsAPP.git

If you need to run the server locally, you will need to go to ./src/services/apiCalls.js and put the right urlRoot.
<center><img src="./public/rooturl.jpg"></center>
and ./src/pages/Login/Login.tsx
<center><img src="./public/rooturl2.jpg"></center>

## Pages

To log as admin 
``` js
    "email": "admin@gmail.com",
    "password": "Aa123456"
```
To log as a teacher you can either use this one or you can register your own as an admin
``` js
    "email": "yola@gmail.com",
    "password": "Aa123456"
```
To log as a parent user you can either use this one or you can register your own
``` js
    "email": "vicente@gmail.com",
    "password": "Aa123456"
```
To log as a teacher that is also a parent you can either use this one or you can register your own
``` js
    "email": "javier@gmail.com",
    "password": "Aa123456"
```

- LOGIN :earth_africa:

<center><img src="./public/login1.jpg"></center> 

:earth_africa: 
<details>
<summary>Admin </summary>

- MENU
<center><img src="./public/menuadmin.png"></center>

- REGISTER :earth_africa:

<center><img src="./public/register1.jpg"></center>
<center><img src="./public/register2.jpg"></center>

As you are writing in the inputs you can see if the field has an error and is not valid.

As a user can have more than one role, if you want to add a teacher that is already registered as a father you can choose the option "user already registered" and it will appear a menu to search the user.

- USERS :earth_africa:

<center><img src="./public/users.jpg"></center>

As you are writing in the inputs you can see if the field has an error and is not valid

- SUBJECTS :earth_africa:

<center><img src="./public/subjects.jpg"></center>

As you are writing in the inputs you can see if the field has an error and is not valid

- STAGES :earth_africa:

<center><img src="./public/stages.jpg"></center>

As you are writing in the inputs you can see if the field has an error and is not valid

- COURSES :earth_africa:

<center><img src="./public/courses.jpg"></center>

As you are writing in the inputs you can see if the field has an error and is not valid


</details>

</br>

:lock:

<details>

<summary>Teacher</summary>

- MENU
<center><img src="./public/menuteacher.png"></center>

- EVENTS

<center><img src="./public/navbar.jpg"></center> 

Detail of de header when a user is logged. There are three sections.

In the left we can go to "profile", "my posts", "following" and "search". In your profile you can change your first and last name, your photo, your password and you can 


</details>

:angel:

<details>

<summary>Parent</summary>

- MENU
<center><img src="./public/menuparent.png"></center>

- CALENDAR

<center><img src="./public/calendar.jpg"></center>

In this page you will see all events related to the child of the user. If parents have more than one child they will be capable of switch between them.

- MESSAGES

<div style="display: flex; justify-content: space-around;">
<center><img src="./public/messages1.png"/></center>
<center><img src="./public/messages2.png"/></center>
</div>

In this page you can see chats with teachers or personal of the school. It will consists in a search bar and all users with conversations with the actual user. If there are messages not read it will be indicated with an indicator showing the number of messages pending.



</details>

## Problems solutions
The project with the most problems due to the deadline of two weeks.
This time I opted to use Zustand instead of Redux because I wanted to learn another method to manage global states.
I also used FullCalendar because I wanted to create a good user experience and I thought that see events in a real calendar was more user friendly and intuitive.
The most problematics issues were the fact that one user can have more than one role and that a parent can have more than one child. I had to create an intermediate table for both problems and make more difficult calls to DB to retrieve all data with the login so the user can swith between the options.
Due to the different roles, the register page was more complex that in the other projects I made until now.


## Future features



[ ] Add Notifications page.

[ ] Add a page to make the assistance of the students of a class so teachers can inform if a student is absent.

[ ] Events page is not prepared to be viewed on a mobile device due to the information showed. It will be better to make a simplistic view if using an smarphone.

[ ] Add a section to show payments

[ ] Add a section to see the month menu of the school and see what the students eat at the school canteen.


## Development:

``` js
 const developer = "Javier Gallego";

 console.log("Desarrollado por: " + developer);
```  

## Contact
<div align="center">
<a href = "mailto:galgar@gmail.com"><img src="https://img.shields.io/badge/Gmail-C6362C?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
<a href="https://www.linkedin.com/in/javier-gallego-dev"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a>
<a href="https://github.com/Javi-Gallego"><img src="https://img.shields.io/badge/github-24292F?style=for-the-badge&logo=github&logoColor=white" target="_blank"></a>
</div>