# User API Spec

## Register User

Endpoint : POST /api/users

Request Body: 

```json
{
    "username": string,
    "password": string,
    "name": string
}
```

Response Body (201):

```json
{
    "data": {
        "username": string,
        "name": string
    }
}
```

Response Body (400):

```json
{
    "errors": string[]
}
```
## Login User

Endpoint : POST /api/users/login

Request Body: 

```json
{
    "username": string,
    "password": string,
}
```

Response Body (200):

```json
{
    "data": {
        "username": string,
        "name": string,
        "token": string,
    }
}
```

Response Body (400):

```json
{
    "error": "Username/Password is incorrect"
}
```

## Get User

Endpoint : GET /api/users

Request Header:
- X-API-TOKEN 

Response Body (200):

```json
{
    "data": {
        "username": string,
        "name": string,
    }
}
```

Response Body (401):

```json
{
    "error": "You must login to proceed"
}
```

## Update User

Endpoint : PATCH /api/users

Request Header:
- X-API-TOKEN 

Request Body: 

```json
{
    "password": string, //optional
    "name": string //optional
}
```

Response Body (200):

```json
{
    "data": {
        "username": string,
        "name": string,
    }
}
```

Response Body (401):

```json
{
    "error": "You must login to proceed"
}
```


## Logout User

Endpoint : DELETE /api/users

Request Header:
- X-API-TOKEN 

Response(204)

Response Body (401):

```json
{
    "error": "You are not logged in"
}
```
