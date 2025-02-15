What this application is doing ??


In this application we are allowing user to login only from one device,browser etc. We are using session management in order to achieve our this target. When user login from one device then we store the current session in active session and store it in cache. When user login from
other device or browser then we delete the previous session from the active session and store the current session in active session. While doing all that we are storing the session in the cache also(locally) to improve our response time. So when we destroy the session then we also 
destory the session from the cache also. We use socket.io in this application so that as soon as user switch from one device to another the previous session get destroyed immediately in order to give good user experience and also to improve accuracy. Various packages are used in order
to meet this target like bcryptjs , jsonwebtoken etc. Further more as we have only one resource in our application that is User we can update this by implementing the resource update code. Along with this as we are using socket.io to trigger destroysession event in order to 
destroy the session in the case of user switch login from one device to another thus in futhre if we want to implement chat feature in our application we can also do that.


In our application we use typeorm as an ORM tool and mysql database.
middlewares are used to do the authentication using jsonwebtoken

we first create model files tehn by running the command create migration and seeds folder and then we use 

npm run build  --> to transpile the typescript code into javascript
npm run start --> to run the application

both the two commands should be run from the root directory of the project

