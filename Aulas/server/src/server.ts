import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express(); //app is the application

app.use(cors());
app.use(express.json());
app.use(routes);

//localhost:3333
app.listen(3333); //This method makes the application listen to a HTTP requests. 3333 is the door used

/*
VERBS HTTP:
  - GET: To search or list some information;
  - POST: To create new information;
  - PUT: To update some existing information;
  - DELETE: To exclude some existing information.
*/
/*
Inside a request there are 3 parameters kinds:
 - REQUEST BODY: data to creat ou to update a register;
 - ROUTE PARAMS: identifies which resource will be updated or created;
 - QUERY PARAMS: used to pagination, filters, ordination, 
*/