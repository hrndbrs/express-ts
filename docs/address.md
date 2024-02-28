# Address API Spec

## Create Address

Endpoint: POST /api/contacts/:idContact/addresses

Request Header:
- X-API-Token

Request Body:

```json
{
    "street": string,
    "city": string,
    "province": string,
    "country": string,
    "postal_code": string,
}
```

Response Body(201):

```json
{
    "id": integer,
    "street": string,
    "city": string,
    "province": string,
    "country": string,
    "postal_code": string,
}

```

Response Body(400):

```json
{
    "errors": string[],
}
```

## Get Address

Endpoint: GET /api/contacts/:idContact/addresses/:idAddress

Request Header:
- X-API-Token

Response Body(200):

```json
{
    "id": integer,
    "street": string,
    "city": string,
    "province": string,
    "country": string,
    "postal_code": string,
}

```

Response Body(401, 404):

```json
{
    "error": string,
}
```
## Update Address

Endpoint: PUT /api/contacts/:idContact/addresses/:idAddress

Request Header:
- X-API-Token

Request Body:

```json
{
    "street": string,
    "city": string,
    "province": string,
    "country": string,
    "postal_code": string,
}
```

Response Body(200):

```json
{
    "id": integer,
    "street": string,
    "city": string,
    "province": string,
    "country": string,
    "postal_code": string,
}

```

Response Body(400):

```json
{
    "errors": string[],
}
```

## Remove Address

Endpoint: DELETE /api/contacts/:idContact/addresses/:idAddress

Request Header:
- X-API-Token

Response(204)

Response Body(403, 404):

```json
{
    "error": string,
}
```

## List Address

Endpoint: GET /api/contacts/:idContact/addresses

Request Header:
- X-API-Token

Response Body(200):

```json
{
    "data": [
        {
            "id": integer,
            "street": string,
            "city": string,
            "province": string,
            "country": string,
            "postal_code": string, 
        },
    ...
    ]
}
```

Response Body(403, 404):

```json
{
    "error": string,
}
```
