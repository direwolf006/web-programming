const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const xss =require('xss-clean')
const helmet=require('helmet')
var mysql= require('mysql');
const accessTokenSecret = process.env.ACCESS_TOKEN;
const axios =require('axios');
const log4js = require("log4js");

log4js.configure({
    appenders: { info: 
                    {   
                        type: "file", 
                        filename: "logs/info/info.log",
                        maxLogSize:10485760,
                        keepFileExt:true
                    },
                 error: 
                    { 
                        type: "file", 
                        filename: "logs/error/error.log",
                        maxLogSize:10485760,
                        keepFileExt:true
                    }
                },
    categories: { default: { appenders: ["info"], level: "info" } ,
                  error: { appenders: ["error"], level: "error"}
                }
  });
   
  const infoLogger = log4js.getLogger("info");
  const errorLogger = log4js.getLogger("error");


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : process.env.MYSQL_USERNAME,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
    multipleStatements: true,
  });
  
  connection.connect(function(err) {
      if (err) {
        res=err.stack;
        errorLogger.error('error connecting: ' + err.stack);
        console.error('error connecting: ' + err.stack);
      }
    else{
      res=connection.threadId;
      infoLogger.info('connected as id ' + connection.threadId);
      console.log('connected as id ' + connection.threadId);
    } 
  });

const app = express();
app.use(xss());
app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(express.static('results'))
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const VerifyRoute=(req,res,next)=>{
  const authHeader = req.headers.authorization;
  if (authHeader!==""&&authHeader!==undefined&&authHeader!==null) {
      const token = authHeader.split(' ')[1];
      if(token===accessTokenSecret) {
          next();
      }else{
          return res.sendStatus(403);
      }
  }else{
      return res.sendStatus(403)
  }
}

app.post('/user/login',VerifyRoute,(request,response)=>{
  const{email}=request.body;
  console.log("logging in");
  console.log(request.body);
  connection.query("SELECT * FROM users ;",function(error, result, fields){
    if(error){
        errorLogger.error("Error Fetching the user profile from user table "+error);
    }else{
        response.send(JSON.stringify(result))
    }
});
  
});

app.post('/user/new',VerifyRoute,(request,response)=>{
  const{user_id,email}=request.body;
  console.log(request.body);
  console.log("logging in");
  connection.query("INSERT INTO users (user_id,email_id) VALUES ('"+user_id+"','"+email+"');",function(error, result, fields){
    if(error){
        errorLogger.error("Error creating the user from user table "+error);
    }else{
        response.send("success")
    }
  })
});

app.listen(3005,()=>{
  console.log("Connected to port 3005");
});
