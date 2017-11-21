# Nissan Connect App

This repository contains an HTTP server (in `/server`) and a front end web client (in `/client`).

This uses [nissan-connect](https://github.com/beejjacobs/nissan-connect) to re-expose the Nissan Connect API over HTTP.
It also incorporates a simple JSON store for historical data, to reduce API calls.

**Note** This is not designed to be secure, and is only really intended to be run on a LAN with no access over the internet.
The server uses your account details from a config file and is not designed to handle multiple users.   
