# Resumiarmus- Your Resume Builder Web App 🗒️ 🎶 📄
- Cast *Expelliarmus* 🌟 on your next opponent and seize that job just by crystallizing custom/inbuilt- resume from a list of 
curated template options, designed and developed efficiently just to make you job-ready! ☄️

![resumiarmus_logo](https://github.com/Nkovaturient/Resumiarmus-Your-Resume-Builder-Web-App/assets/127786136/56befdd1-4859-417f-9ba4-dbac6f7d12ca)

![Screenshot (286)](https://github.com/Nkovaturient/Resumiarmus-Your-Resume-Builder-Web-App/assets/127786136/af074bfa-1a73-444d-b4c3-068a002c95b3)


## 🍀Technologies Used 🧑‍💻

- **MongoDB**: For efficient data storage. 🏪
- **Mongoose**: Nodejs lib for query builders, validations, middleware functions 🏛️
- **Node.js**: Powering our backend server. ◀️
- **Express.js**: Handling server-side logic. 🧮
- **Reactjs**: Optimising Frontend- UI/UX with modular and well-structured components, routing, and redux management. ⚛️
- **JavaScript**: Driving interactivity and functionality. 🏄
- **jsonwebtokens**: Ensuring secure authentication and seamless user routing across webpages with the help of defined jwt token session . 🛂
- **bcrypt**: Robust, solid security by hashing and salting passwords while user registration. 🔐
- **nodemailer**: zero-dependency module for sending emails to users from server easily. 📫
- **notistack** : attractive notifications provider api library for better user-communication and updation 🔔

# Frontend Updates  ⚛️ 📊
## After long hours of consistency and error handling, I have revised and setup my frontend with react-vite and redux libraries 🗽 🥳
-  **Redux**-state management library handling entire
- backend-authentication, fetching data, user details updation, CRUD operations on resumes and user models efficiently :
- utilising Reducer, actions and slice of react-redux 📃
- Achieving **Modularity** : crux of programming by breaking down + structuring each section and logic into various components 📔
- Implemented Responsive Media Query for mobile, desktop and tablet screens 🌟
  
![Screenshot (287)](https://github.com/Nkovaturient/Resumiarmus-Your-Resume-Builder-Web-App/assets/127786136/4b221ac8-1a42-4e0d-90be-87c3b9b77b7b)

# Noteworthy Point for Project Building- 🗒️
- Frontend .env environment var to be imported in vite via- import.meta.env.VITE_API_URL(as required)
- components logic and rendering 'return'
- For implementing 'sending Email' functionality using Nodemailer 📫- creating transporter and services via Google.auth.OAuth2-
   - web app must be registered on google dev console for client_id, secret
   - Gmail API v1 services in OAuth 2.0 playground enabled for the app to retrieve refresh token
   - Enabled APIs and Services on Google dev console


# To Resolve: ⏲️
- Reset password component- to handle configuration in *jwt tokens* as per jsonwebtoken library principles
- while editing the savedResumes of user, achievements section couldnt be mapped-hence, yet to revise the setup!

Happy Coding! 😄💙
