# Passport and session boilerplate

## Run

```shell
npm install
npm start
```
-> server then runs on port 3000:
http://localhost:3000

## Routes
### GET /
-> send hello

### GET /test
-> **protected**

You need to be authenticated.
Sends a json upon success.

### POST /auth/login
`Content-Type: application/json`
```json
{
  "username": "john",
  "password": 42
}
```
Other credentials will fail

### POST /auth/logout
Logs the user out

## Make it work
1. Go to / -> it works
2. Go to /test -> 401 unauthorized
3. POST /auth/login as above -> get the result of the `set-cookie` header.
(It should be something like: `connect.sid=s%3ADUIPwPJWFYTG63VBCoDE1wCOwxxaaZVU.SSEdlrRpjv0XB7WkjNNOOAMEUpYhFWsrZ7EUJ7dyMio; Path=/; HttpOnly`)
4. New request to GET /test but adds the header `cookie` with the previous thing -> It works, woohoo!

NOTE: doesn't work directly in the browser 'cause no html yet.
Just send first request with the browser and others by hand with F12 > network,
or Postman or https://addons.mozilla.org/en-US/firefox/addon/restclient/ or whatever.