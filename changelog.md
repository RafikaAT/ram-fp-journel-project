# Changelog

## TODO

[X] Finish tech stack
[X] Features
[X] Pages list
[X] Api Endpoints list
[] Make TODO on notion - write initial todo
[] Make Organisation - Go with path of least resistance (morris/ram)

## The plan

### Tech stack

Frontend

- HTML
- CSS - maybe Bootstrap
- Javascript
- NPM
  - Jest
  - Concurrently
  - Watchify
  - Lite-server (flex)

Backend

- Node
- Express
- NPM
  - Express
  - Cors
  - Morgan
  - Nodemon
  - Jest
  - Supertest

### Features

Edit or delete a post or comment (stretch)

- cache posts or comments made by a user
- any cached post or comment can be updated by the user

Create a post

- text (char limit)
- giphy gif link
- category choice

Respond to a post

- click an emoji
- leave a comment

Emojis

- Like
- Dislike
- Love

Categories

- dynamically generated from user submission (stretch)
- anime
- food
- movies

Pages

- index.html
- anime.html
- food.html
- movies.html
- dynamic category page (stretch)

### API

- `/`
  - GET `Hello World`
- `/journels`
  - POST
  - GET
- /journels/:journeyId
  - PUT
  - DELETE
  - GET (maybe)
- /journels/:journeyId/:emoji
  - PUT
- /journels/:journeyId/comments
  - GET
  - POST
- /journels/:journeyId/comments/:commentId
  - PUT
  - DELETE
- /categories/
  - GET
