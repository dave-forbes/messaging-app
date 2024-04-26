Live demo - https://discussr.netlify.app/

# Discussr Messaging App

A full stack web app with a separate frontend and backend. Made with the following technologies/tools/dependencies.

Frontend
- Typescript
- React
- Vite
- React Router
- React Select - https://react-select.com/
- Sass/Scss

Backend
- Typescript
- Express
- Mongoose/MongoDB
- bcrypt
- Express Validator
- Json Web Token
- Multer
- Sharp
- Nodemon
- AWS SDK - S3 Client and Request Presigner

## Features

- From scratch authentication. Register and login using express validator, json web token and bcrypt. Token stored in local storage, if it is still valid when refreshing page, user will still be logged in, otherwise logged out.
- RESTful API. Create and update users, create conversations, if user is the conversation creator, they can add or remove members, leave conversations, create messages.
- Custom UI using page routing for login and register pages, and otherwise a SPA.
- Thorough and user friendly error handling for API requests.
- Users able to choose an image for their avatar as well as send images to other users. Uploaded using multer and stored in a AWS s3 bucket, to be accessed with presigned URLs on request. Images resized and converted to smaller jpegs using Sharp.
- Ability to toggle dark mode, preference stored in local storage. Or alternatively detected from system preference.


