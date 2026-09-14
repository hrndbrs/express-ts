# Health API Spec

## Health Check

Endpoint : GET /api/health

Response Body (200):

```json
{
    "data": {
        "status": "ok",
        "database": "up",
        "uptime": number, // seconds
        "timestamp": string // ISO 8601
    }
}
```

Response Body (503):

```json
{
    "data": {
        "status": "error",
        "database": "down",
        "uptime": number,
        "timestamp": string
    }
}
```
