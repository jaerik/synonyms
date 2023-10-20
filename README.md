# synonyms
Web application for managing synonyms

## Prerequisite

1. The following tools installed on your computer:
    * docker
    * docker compose

2. Create the file server_password and add the preferred web server password to it.

```sh
echo < server password > >server_password
```

> **`NOTE`** \
The default user is **watkinsapt**. It can be changed in the .env file.

3. Create the file db_password and add the preferred data base password to it.

```sh
echo < db password > >db_password
```

## Run application
Start the web server and the data database.

```sh
docker compose up
```

The web server can be accessed on the following address:
[https://localhost:8443](https://localhost:8443)

## Run application developing mode
Start the web server and the data database and the developer server.

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml
```

developer server can be accessed on the following address:
[http://localhost:8080](http://localhost:8080)
