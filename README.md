# Auth-static

A super-simple node-static server with http basic auth, perfect for serving static content on Heroku behind a username and password.

Works as a simple static server without authentication until pushed to production, whereupon basic HTTP authentication is employed.

Supports a superset of the [`node-static` API](https://www.npmjs.com/package/node-static#api).

## Usage

```
var server = require('auth-static')

server(config)
```

## Config

Auth-static uses a configuration object with the following keys:

```
var config = {
	options: {
		// supports node-static options
	},
	password: process.env.PASSWORD, // environment variable
	port: 1234,                     // port for localhost only
	realm: 'Private',               // label for the auth form
	root: './example',              // root directory to serve
	username: process.env.USERNAME  // environment variable
}
```

## Heroku

The simplest way to get up and running on with auth-static on Heroku (assuming you've already installed the [Heroku Toolbelt](https://toolbelt.heroku.com/)) is to:

1. Create a Heroku app
1. Install `auth-static` via NPM
1. Create the server
1. Tell Heroku to run the server
1. Set up the config variables in the Heroku Dashboard
1. Commit your changes
1. Push your code to Heroku
1. Test your app

### In more detail

#### 1. Create a Heroku app

`heroku create your-app-name`

Replace `your-app-name` with whatever you want your app to be called. This example would result in the app being available at <https://your-app-name.herokuapp.com/>.

#### 2. Install `auth-static` via NPM

`npm install --save auth-static`

#### 3. Create the server

```
// index.js

var server = require('auth-static')

server({
	options: {
	    cache: 3600,
	    gzip: true
	},
	password: process.env.PASSWORD,
	port: 1234,
	realm: 'Private',
	root: './example',
	username: process.env.USERNAME
})
```

### 4. Tell Heroku to run the server

The Procfile tells Heroku what to do once it's installed your project.

We want Heroku to run the server that lives in `index.js`:

```
// Procfile

web: node index.js
```

#### 5. Set up the config variables in the Heroku Dashboard

Visit <https://dashboard.herokuapp.com/>, navigate to the settings page for your app and edit the config variables. We need to create pairs for `NODE_ENV`, `USERNAME`, and `PASSWORD`. `NODE_ENV` needs a value of `productio` for everything to work, whereas the the other two can be whatever you want.

#### 6. Commit your changes

`git commit -m "Setting up auth-static"`

#### 7. Push your code to Heroku

`git push master heroku`

#### 8. Test your app

Running `heroku open` will open your app (e.g. <https://your-app-name.herokuapp.com/>) in your browser of choice. If everything has worked, you will be presented with a basic auth form; enter your username and passowrd and you'll be able to see your static content.
