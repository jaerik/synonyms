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

## Run application local
Build the web server container image if not yet built or if it have changed since the last build and then start the web server and the data database.

```sh
docker compose up --build
```

The web server can be accessed on the following address:
[https://localhost:8443](https://localhost:8443)



## Run application developing mode
Build any images that are not yet built or have changed since the last build and then start the web server and the database and the developer server.

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

developer server can be accessed on the following address:
[http://localhost:3000](http://localhost:3000)
