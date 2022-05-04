# We Love Movies

## Installation

1. Fork this repository by clicking the Fork button at the top right of the page.
2. Clone this repository.
3. `cd` into the newly created directory.
4. Run `npm install`.
5. Run `npm start`.

Running `npm start` will run both the backend and the client.

## Existing files

This repository is set up as a monorepo, meaning that the client and backend projects are in one repository. This allows you to open both projects in the same editor.

The table below describes the folders in this starter repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./backend`      | The backend project, which runs on `localhost:5000` by default.  |
| `./client`       | The frontend project, which runs on `localhost:3000` by default. |

### GET /generate

Making a `GET` request to `/generate` will return a randomly-generated name.

## Notes:

This is meant to be deployed on Heroku. Fetching may take a few seconds while Heroku spins up the server.