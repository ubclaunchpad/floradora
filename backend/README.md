## Developer Setup

Make sure your current directory is backend.
Run `npm install` at the very beginning before you start your development.
Run `npm run start` to start the server.
Navigate to http://localhost:8080/isalive

## Docker Notes
To build the docker image for the backend, run (while in the backend folder) `docker build -t virtual-collection .`
To run the container based off of the created image, `docker run -it -p 8080:8080 virtual-collection`
