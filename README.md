## BiZ9-Core 


```
/* --- APP CONFIG  --- */ 
const PROJECT_ID="19"; 
const APP_TITLE_ID="sample_app_19"; 
const APP_TITLE="BiZ9 Sample App"; 
const APP_CLOUD_BUCKET="aws_bucket";  

/* --- BIZ9 CONFIG --- */
const BIZ_MAP=true; // convert field titles field_1, field_2 with value_1, value_2 [default=true]

/* --- MONGO --- */
const MONGO_IP="localhost"; 
const MONGO_USERNAME_PASSWORD=""; 
const MONGO_PORT="27019";
const MONGO_SERVER_USER="admin";
const MONGO_CONFIG="/etc/mongod.conf";
const SSH_KEY=""; // used to restart remote server on mongo fail.

/* --- REDIS --- */
const REDIS_URL="0.0.0.0";
const REDIS_PORT="27019";

/* --- AWS --- */
const AWS_S3_SAVE=true;
const AWS_S3_BUCKET=APP_CLOUD_BUCKET;
const AWS_KEY="";
const AWS_SECRET="";
const AWS_REGION='us-east-2';

data_config={
    mongo_server_user:MONGO_SERVER_USER,
    mongo_username_password:MONGO_USERNAME_PASSWORD,
    mongo_ip:MONGO_IP,
    mongo_port:MONGO_PORT,
    mongo_config:MONGO_CONFIG,
    ssh_key:SSH_KEY,
    redis_url:REDIS_URL,
    redis_port:REDIS_PORT,
};
app_config={
    app_title_id:APP_TITLE_ID,
    app_version:APP_VERSION,
    app_title:APP_TITLE,
    project_id:PROJECT_ID,
    file_url:FILE_URL,
    biz_map:BIZ_MAP
}

biz9=require("biz9-core")(app_config,data_config);
```
## The Core of The BiZ9 Framework
The BiZ9-Core library is the heart of the BiZ9 Framework. It is used within a Node.js application as an interface to handle popular business functions such as product processing, service booking, and ticket handling. You access the core library interface with pre defined data about the project, database settings, and 3rd party tool parameters. The data access utilizes memory caching to speed things up.  


### Required Libriaries
* [MongoDB](https://www.mongodb.com/)
* [Redis](https://redis.io/)    
### Other Libriaries
* [Amazon Web Service SDK](https://aws.amazon.com/developer/tools/)
* [Stripe](https://stripe.com/docs/api) 
* [Brevo API](https://developers.brevo.com/)



### Fast Data Access
The core library handles data access for applications as well. Data is retrieved from cache instead of the database. This speeds up data processing tremendously. On data insert, each object is written to the database, and also added to memory using a unique key/value. To retrieve data, you would use that unique key and the object will be accessed via the system memory instead of the database. This approach speeds up data access of the application.
### Key Features 
* CRUD Data Access
* Caching
* Business Logic
* Utilities
* Notifications
* File Processing
* Cloud Storage

## Company
- Certified CoderZ
## E-mail
- certifiedcoderz@gmail.com
## Code
- [BiZ9 Framework Github](https://github.com/biz9framework)
- [BiZ9 Core NPM](https://www.npmjs.com/package/biz9-core)
## Website
- [certifiedcoderz.com](https://certifiedcoderz.com)
## Support
- [$TaNK9Code](https://cash.app/$Tank9Code)

## The BiZ9 Framework 🦾

The BiZ9 Framework is a user-friendly platform for building fast and scalable network applications. The framework consists of libraries and software tools like: Node,js, ExpressJS, MongoDB, Nginx, Redis, GIT, and Bash. The BIZ9 Framework is designed to build, maintain, and deploy rich, robust, and data driven real-time applications for data driven web, Android and Apple devices. Other 3rd party Application Programming Interfaces that are pre included are Amazon Web Service, Stripe and Bravely, 


- [What Is The BiZ9 Framework? ](https://medium.com/@tank9code/what-is-the-biz9-framework-ec67d123e505)

## TaNK9 Code 👽

Brandon Poole Sr also known as ‘TaNK’ is a full stack application developer
born and raised in Atlanta Ga and graduated with a Computer Information Systems degree from Fort Valley State University (FVSU). 
- [Tank9Code Blog](https://medium.com/@tank9code/about-brandon-poole-sr-ac2fe8e06a09)
-----------------------------------------------

## Brandon Poole Sr.
- [BoSS AppZ](https://bossappz.com) Creator
- 9_OPZ #Certified CoderZ Founder
- The Real Tank from the #Matrix movie!
- Expert in Open Source Software
- 
## LinkZ:
- [certifiedcoderz.com](certifiedcoderz.com)
- [instagram.com/tank9code](instagram.com/tank9code)
- [twitch.com/tank9code](twitch.com/tank9code)
- [twitter.com/tank9code](twitter.com/tank9code)
- [medium.com/@tank9code](medium.com/@tank9code)
- [blogpost.com/certifiedcoderz](blogpost.com/certifiedcoderz)
- [blogpost.com/tank9code](blogpost.com/tank9code)
- [tictok.com/tank9code](tictok.com/tank9code)
- [facebook.com/tank9code](facebook.com/tank9code)
## TagZ: 
#### #BoSSAppZ  
#### #BiZ9Framework
#### #EBook
#### #Mobile
#### #Apple
#### #Android
#### #IOS
#### #Linux
#### #AmazonWebServices
#### #AppMoneyNoteZ
#### #TaNKCode9
##### Thank you for your time.
#####  Looking forward to working with you.
