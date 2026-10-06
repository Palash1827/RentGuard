# RentGuard Backend

Spring Boot 4 + MongoDB. JWT authentication and photo upload/fetch (images stored in GridFS).

## Run
1. Start MongoDB (local `mongod`, Docker `docker run -p 27017:27017 mongo`, or an Atlas URI).
2. Set env vars (see `.env.example`): `MONGODB_URI`, `JWT_SECRET` (32+ chars), optional `CORS_ORIGINS`.
3. `./mvnw spring-boot:run`  (Java 21). Server: http://localhost:8080

## API
| Method | Path | Auth | Notes |
|---|---|---|---|
| POST | /api/auth/register | no | `{name,email,password(8+)}` -> token |
| POST | /api/auth/login | no | `{email,password}` -> token |
| GET | /api/auth/me | yes | current user |
| POST | /api/photos | yes | multipart: `file` (required), `title`, `description`, `propertyId` |
| GET | /api/photos | yes | list own photos; optional `?propertyId=` |
| GET | /api/photos/{id} | yes | metadata |
| GET | /api/photos/{id}/content | yes | image bytes |
| DELETE | /api/photos/{id} | yes | removes metadata and image |

| GET/POST | /api/complaints | yes | list / create (`title, category, location, priority, description`) |
| GET/PUT/DELETE | /api/complaints/{id} | yes | PUT is partial and accepts `status` (OPEN, IN_PROGRESS, RESOLVED) |
| GET | /api/repairs | yes | one repair is auto-created per complaint and follows its status |
| PUT | /api/repairs/{id} | yes | `technician, expectedDate, status, note` |
| GET/POST | /api/payments | yes | `{month, amount, status}` |
| DELETE | /api/payments/{id} | yes | |
| GET/PUT | /api/agreement | yes | GET returns 404 until one is saved |
| POST | /api/evidence/upload | yes | multipart: `complaintId`, `file` (image or video) |
| GET | /api/evidence/complaint/{id} | yes | evidence list; bytes via `/api/photos/{photoId}/content` |
| POST | /api/ai/chat | yes | `{message}` -> `{reply}` (rule-based assistant, no external AI) |
| GET | /api/health | no | |

Send `Authorization: Bearer <token>` on protected routes. Users can only see their own photos.

## Try it
```bash
curl -X POST localhost:8080/api/auth/register -H 'Content-Type: application/json' \
  -d '{"name":"Ann","email":"ann@example.com","password":"password123"}'

TOKEN=...   # token from the response
curl -X POST localhost:8080/api/photos -H "Authorization: Bearer $TOKEN" \
  -F file=@kitchen.jpg -F title="Kitchen" -F propertyId=flat-12
curl localhost:8080/api/photos -H "Authorization: Bearer $TOKEN"
curl localhost:8080/api/photos/<id>/content -H "Authorization: Bearer $TOKEN" -o out.jpg
```

## Frontend note
`<img src>` cannot send an Authorization header. Fetch `/content` with the header, then use
`URL.createObjectURL(await res.blob())` as the image source.
