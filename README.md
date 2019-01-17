## Work Samples

[robertpaulrespicio.com](robertpaulrespicio.com)

This repository is a broad selection of code samples, selected to show examples of my work over multiple projects (current to present). My most current project, eleveight inc., styling was pre-determined per clients request and followed accordingly. It is a MVP product for the client to present to future consumers and is deployed but you can only view it by invite only(it will only show you the log in screen). So I have provided pictures, along with sample code of this project.

Code shown here is to show core functionality for which I was solely responsible for.

--------------------

##### C# Endpoints (ReactJs, SMSS/T-SQL, Apache Log4Net, C#) - OCTOBER 2018
CRUD Endpoints used to communicate SQL to C# API to ReactJs through axios calls. Inside RespicioAPIControllers you can also see the apache framework log4net for logging implemented into the API controllers. I put these into my own controllers to see if it was working correctly and I was instructed to assist my fellow developers and help them correctly leverage logging as well.

--------------------

##### Log Admin Page (ReactJs, SMSS/T-SQL, C#, REDUX, Moment.js) - OCTOBER 2018
This is the react component that was created by me to display the logs. It's purpose is to serve as a tool for the admin and future developers to help maintain the stability and security of the website.  In the picture you can see that the component has three input fields where they can search the severity the log in question, the dates and any keyword inside the logger or message fields. All three search bars are made with a query string and will automatically display what was searched into the list below. Logs can easily reach into the millions and because of this I handled pagination, sorting and filtering SQL server side to improve performance for the application. Redux was used to keep track of current user and to make sure they had the proper authority to view logs, moment was used for a datetime dependency.

--------------------

##### SQL Procedures (SMSS/T-SQL, C#) - OCTOBER/NOVEMEBER 2018
Here are a few SQL procedures that I wrote for logging and for organization heirachy. My fellow colleague was working on a role based system and I was brought on to work on an organizational heirachy, for example, the main admin has the highest authorization in which they are able to invite organization admins and assign them to a certain organization. Whereas when a case manager invites, say a client, they do not have the power to reasign them to another organization. The client will be directly linked to the same organization the case manager is in. 

##### Role Based Routing Page (ReactJS, SMSS/T-SQL, REDUX, C#) - NOVEMEBER/DECEMBER 2018
This is the continuation of the SQL procedures, this page was designed by another developer in which I implemented a component inside of the form to allow for role based routing. This is the sample code of just the organizational heirachy component.

--------------------

##### Organization Resource Management Page (ReactJS, SMSS/T-SQL, REDUX, C#) - DECEMBER 2018
In this react component, I designed a page where employees of the same organization can easily access information of people in the same organization. In some cases an employee can be in two or more organizations at once, and this is designed to help them easily navigate the page. Each user has their information displayed and has an accordian style box that reveals a chat box. The chatbox was designed by a co-developer but I created an add-on feature which would display offline/online by listening for a call through websocket.io and redux.

--------------------

##### Unit Testing (ReactJS, Moq, C#) - OCTOBER 2018
A few samples of moq unit testing in C# and a simple log form created to quickly add parameters and test logging functionality.
