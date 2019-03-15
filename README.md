# Steps needed to deploy to heroku where the rails API server serves react as a static file from /public

### on the command line cd into the 'web' dir to develop as a stand alone react app 

- create a project directory and cd into it

- create the rails API server
```
rails new . --api --database=postgresql -J -T -S -C --skip-coffee --skip-spring --skip-turbolinks --skip-yarn --no-rdoc --no-ri
```
- add the following gem to the top of the jem file:-
```
gem 'dotenv-rails', groups: [:development, :test]
```
- add gems:-
```
gem 'devise-jwt', '~> 0.5.5'
gem 'active_model_serializers', '~> 0.10.0'
gem 'annotate'
gem 'foreman'
```
- add to app/controllers/application_controller.rb so it looks as follows
```
class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include ::ActionController::Serialization
  respond_to :json
end
```
- generate a new key and add to the .env file as follows:-
```
bundle exec rake secret
```
- add the entry in the .env file (where xxxxx is the new generated key):-
```
DEVISE_JWT_SECRET_KEY=xxxxxx
```
- in app/config/environments/development.rb (and test.rb) set the following:-
```
config.consider_all_requests_local = false
```
- create config/initializers/active_model_serializer.rb
```
ActiveModelSerializers.config.default_includes = '**'
ActiveModelSerializers.config.adapter = :json
ActiveModelSerializers.config.json_include_toplevel_object = true
```
- set up devise, follow online instructions
- follow instructions for devise-jwt (including seting up devise for API server)
- in app/config/initializers/devise.rb add:-
```
Devise.setup do |config|
  # ...
  config.jwt do |jwt|
    jwt.secret = ENV['DEVISE_JWT_SECRET_KEY']
    jwt.expiration_time = 18 * 3600  # 18 hours
  end
end
```
- add the following to routes.rb
```
devise_for :users, path_prefix: 'api', defaults: { format: :json }
```
- create the react app (in dir 'web')
```
yarn create react-app web
```
- cd into 'web' directory
- add the proxy and axios modules
```
yarn add http-proxy-middleware axios
```
- the package.json should look like this...
```
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.18.0",
    "http-proxy-middleware": "^0.19.0",
    "jwt-decode": "^2.2.0",
    "lodash": "^4.17.4",
    "node-sass-chokidar": "^1.3.4",
    "npm-run-all": "^4.1.3",
    "react": "^16.6.0",
    "react-dom": "^16.6.0",
    "react-router-dom": "^4.2.2",
    "react-scripts": "2.1.1"
  },
  "scripts": {
    "build-css": "node-sass-chokidar src/ -o src/",
    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
    "start-js": "react-scripts start",
    "start": "npm-run-all -p watch-css start-js",
    "build-js": "react-scripts build",
    "build": "npm-run-all build-css build-js",
    "dev": "npm-run-all -p watch-css start-js",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
```
- in the web/src dir, create setupProxy.js file
```
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('api',
    { target: 'http://localhost:3001' }
  ))
}
``` 
- copy the contents of .gitignore (in web/.gitignore) to rails root .gitignore (first prefix the directories with 
/web/)
```
# dependencies
/web/node_modules
/web/.pnp
/web/.pnp.js

# testing
/web/coverage

# production
/web/build

# misc
/web/.env
/web/.env.local
/web/.env.development.local
/web/.env.test.local
/web/.env.production.local

/web/npm-debug.log*
/web/yarn-debug.log*
/web/yarn-error.log*
```
- delete the web/.gitignore file
- delete the web/README.md file
- change back to the rails root dir
```
cd ..
```
- run bundle install
- create a Procfile.dev (in rails root dir)
```
web: cd web && PORT=3000 npm start
api: PORT=3001 && bundle exec rails s
```
- create a Procfile (in rails root dir)
```
web: bundle exec rails s
```
- create file lib/tasks/start.rake
```
namespace :start do
  desc 'Start dev server'
  task :development do
    exec 'foreman start -f Procfile.dev'
  end
  
  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run build && foreman start'
  end
end
task :start => 'start:development'
```
- create a package.json file in rails root dir
```
{
  "name": "foxbat",
  "engines": {
    "node": "10.9.0"
  },
  "scripts": {
    "build-css": "node-sass-chokidar src/ -o src/",
    "build-js": "react-scripts build",
    "build-web": "cd web && npm install && npm run build-css && npm run build-js && cd ..",
    "deploy": "cp -a web/build/. public/",
    "build": "npm run build-web && npm run deploy && echo 'Web Client built!'"
  }
}
```
- to build a production runtime localy to test it works
```
rake start:production
```
- in heroku CLI (command line interface)
- create the heroku app
```
heroku apps:create
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
```
- build your app...then
- push to heroku
```
git push heroku master
```
