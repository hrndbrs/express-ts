# Contact API Spec

## Create Contact
Endpoint : POST /api/contacts

Request Header:
- X-API-Token

Request Body:

```json
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "phone": string,
}
```
Response Body(201):
```json
{
    "data": {
        "id": integer,
        "first_name": string,
        "last_name": string,
        "email": string,
        "phone": string,
    }
}
```

Response Body(401):

```json
{
    errors: string[],
}
```
## Get Contact

Endpoint : GET /api/contacts/:id

Request Header:
- X-API-Token

Response Body(200):
```json
{
    "data": {
        "id": integer,
        "first_name": string,
        "last_name": string,
        "email": string,
        "phone": string,
    }
}
```

Response Body(401, 404):

```json
{
    error: string,
}
```
## Update Contact

Endpoint : GET /api/contacts/:id

Request Header:
- X-API-Token

Request Body:

```json
{
    "first_name": string,
    "last_name": string,
    "email": string,
    "phone": string,
}
```

Response Body(200):
```json
{
    "data": {
        "id": integer,
        "first_name": string,
        "last_name": string,
        "email": string,
        "phone": string,
    }
}
```

Response Body(401, 404):

```json
{
    error: string,
}
```
## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header:
- X-API-Token

Response(204)

Response Body(401, 404):

```json
{
    error: string,
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameters:
- name: string, optional 
- phone: string, optional 
- email: string, optional 
- page: integer, default 1 
- size: integer, default 10

Response Body(200):
```json
{
    "data": [
        {
            "id": integer,
            "first_name": string,
            "last_name": string,
            "email": string,
            "phone": string,
        },
        ...
    ],
    "paging": {
    "current_page": integer,
    "total_page": integer,
    "size": integer,
    }
}
```

Response Body(401):
```json
{
    "errors": string
}
```
