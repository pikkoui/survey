# Getting Started with Survey App

1) Clone to your local machine the repo from https://github.com/pikkoui/survey.git
2) Navigate to survey directory
3) Execute the command docker-compose build
4) Execute the command docker-compose up

To navigate to the frontend app go to http://localhost:8080/
The site navigates randomly(as per requirement that survey are periodically sent) to either Rating or Survey page.
By clicking submit button the data are submited and the page is reloaded.
Please hit refresh several times if page reaches only survey or rating in order to 
achieve the other component. 

In order to see the values added to the database navigate directly to the backend API service

http://localhost:8110/api/userresponses/  in order to view the survey submissions
http://localhost:8110/api/userratings/  in order to view the rating submissions
