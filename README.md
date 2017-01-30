# FCC Voting App

FCC Voting App is a fullstack JavaScript app to implement a voting app where a user can create voting polls and vote on existing polls

* [FreeCodeCamp] - Link to the exercice
* [Heroku] - Online deployed version

### APP description

The app allows for a user to post, delete and vote on an existing poll. Below is a list of use cases.

  - **Use-case 1:** As an authenticated user, I can keep my polls and come back later to access them.
  - **Use-case 2:** As an authenticated user, I can share my polls with my friends.
  - **Use-case 3:** As an authenticated user, I can see the aggregate results of my polls.
  - **Use-case 4:** As an authenticated user, I can delete polls that I decide I don't want anymore.
  - **Use-case 5:** As an authenticated user, I can create a poll with any number of possible items.
  - **Use-case 6:** As an unauthenticated or authenticated user, I can see and vote on everyone's polls.
  - **Use-case 7:** As an unauthenticated or authenticated user, I can see the results of polls in chart form.
  - **Use-case 8:** As an authenticated user, if I don't like the options on a poll, I can create a new option.

## Local Installation

You'll need to have the latest verison of node.js installed. Either use your OS's package manager or follow the installation instructions on the [official website](http://nodejs.org).

Next, [install git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if it is not already installed. To clone this repository to your local machine, open a command line interface and navigate to your projects directory.

You will also need Gulp (`npm install --global gulp`) and MongoDB. Then type:

`$ git clone https://github.com/sergiomgaspar/smg-voting-app.git`

Move to the `smg-voting-app` subdirectory and type `npm install`. This installs all of the APP dependencies.

Finally, type `gulp serve` to start the application. If all goes well, it will be available at `http://localhost:3000`.

To deploy a "production-ready" version of the app type `gulp build` and deploy the contents of the "dist" folder.

### IMPORTANT
This node app uses MongoDB (free mongoLab instance). The user/password are not correct and you will not be able to logon. Create your instance in mongoLab and **allways define the user and password and environment variables** *(never leave them inside code commited in gitHub!!!)*.

## Technologies used

In the about section of the page the used technologies are listed and described

## License

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, the author has waived all copyright and related or neighboring rights to this work.

[FreeCodeCamp]: <https://www.freecodecamp.com/challenges/build-a-voting-app>
[Heroku]: <https://smg-voting-app.herokuapp.com/>
