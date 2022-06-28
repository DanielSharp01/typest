# Typest

## TODO

- [x] E2E typesafe endpoints POC
- [ ] Making packages *WIP*
- [ ] Refactor POC
- [ ] Documentation

## Purpose of this package

Typest strives to be an end to end typesafe REST API toolkit, with which you can build endpoints on the server and consume them on the client.

The client only gets a lightweight a import from the server side containing the routes and return types.

## TODO More documentation of usage

## Using typest on the backend

Typest spits out route definitions which you can use however you wish. Currently typest supports converting your route definition to:
- Express router

## Using typest on the frontend

Typest aims to be request client agnostic since you import the same route definitions from the server side. Currently we support:
- Simple fetch client
