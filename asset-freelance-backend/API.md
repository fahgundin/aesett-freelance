# Asset Freelance API — Usage Guide

Base URL: `http://localhost:8000/api/v1`
Interactive docs: `http://localhost:8000/docs`

---

## Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Generate a bcrypt hash for your admin password
python -c "from passlib.context import CryptContext; print(CryptContext(['bcrypt']).hash('your-password'))"

# 3. Generate a secret key
openssl rand -hex 32

# 4. Configure environment
cp .env.example .env
# Edit .env — fill in SECRET_KEY and ADMIN_PASSWORD_HASH

# 5. Start the server
python main.py
```

---

## Authentication

All write operations (POST, PATCH, DELETE) require two headers on every request:

| Header | Value |
|---|---|
| `Authorization` | `Bearer <access_token>` |
| `X-CSRF-Token` | `<csrf_token>` |

Both tokens are returned by the login endpoint and expire together (default: 30 minutes).

### Login

```
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "your-password"
}
```

**Response**

```json
{
  "access_token": "eyJ...",
  "csrf_token": "550e8400-e29b-41d4-a716-446655440000",
  "token_type": "bearer"
}
```

---

## News

### List published news _(public)_

```
GET /api/v1/news/
```

### Get one news item by ID _(public)_

```
GET /api/v1/news/{id}
```

### Get one news item by slug _(public)_

```
GET /api/v1/news/slug/{slug}
```

### List all news including unpublished _(admin)_

```
GET /api/v1/news/admin/all
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
```

### Create news _(admin)_

```
POST /api/v1/news/
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "title": "Our latest update",
  "slug": "our-latest-update",
  "summary": "Short description shown in listings.",
  "content": "Full HTML or markdown content here.",
  "image_url": "https://example.com/image.jpg",
  "is_published": true,
  "published_at": "2026-04-07T10:00:00Z"
}
```

`image_url` and `published_at` are optional. `slug` must be unique.

### Update news _(admin)_

```
PATCH /api/v1/news/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "is_published": false
}
```

Only the fields you send are updated.

### Delete news _(admin)_

```
DELETE /api/v1/news/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
```

---

## Services

A single resource covers both active and concluded services. Use `is_concluded` to tell them apart.

### List services _(public)_

```
GET /api/v1/services/                    # all services
GET /api/v1/services/?concluded=true     # concluded only
GET /api/v1/services/?concluded=false    # active only
```

### Get one service _(public)_

```
GET /api/v1/services/{id}
```

### Create service _(admin)_

```
POST /api/v1/services/
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "title": "Brand Identity for Acme Co.",
  "description": "Full brand redesign including logo, typography, and color system.",
  "client_name": "Acme Co.",
  "tags": "branding,design,identity",
  "image_url": "https://example.com/cover.jpg",
  "is_concluded": false,
  "concluded_at": null
}
```

`client_name`, `tags`, `image_url`, and `concluded_at` are optional.
`tags` is a comma-separated string — e.g. `"web,ux,mobile"`.

### Mark a service as concluded _(admin)_

```
PATCH /api/v1/services/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "is_concluded": true,
  "concluded_at": "2026-04-07T00:00:00Z"
}
```

### Update service _(admin)_

```
PATCH /api/v1/services/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "tags": "branding,design,identity,print"
}
```

### Delete service _(admin)_

```
DELETE /api/v1/services/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
```

---

## Transparency Documents

### List documents _(public)_

```
GET /api/v1/documents/                        # all documents
GET /api/v1/documents/?category=financial     # filter by category
```

### Get one document _(public)_

```
GET /api/v1/documents/{id}
```

### Create document _(admin)_

```
POST /api/v1/documents/
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "title": "Annual Report 2025",
  "description": "Full financial report for the year 2025.",
  "file_url": "https://example.com/files/annual-report-2025.pdf",
  "category": "financial",
  "published_at": "2026-01-01T00:00:00Z"
}
```

`description` and `published_at` are optional. `file_url` can be an external URL or a path to a file you host yourself.

### Update document _(admin)_

```
PATCH /api/v1/documents/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "category": "legal"
}
```

### Delete document _(admin)_

```
DELETE /api/v1/documents/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
```

---

## Gallery

Images are stored as URLs — point them at any hosted image (CDN, S3, external host).

### List images _(public)_

```
GET /api/v1/gallery/                      # all images
GET /api/v1/gallery/?category=events      # filter by category
```

### Get one image _(public)_

```
GET /api/v1/gallery/{id}
```

### Create image _(admin)_

```
POST /api/v1/gallery/
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "title": "Opening ceremony",
  "description": "Photos from the 2025 opening event.",
  "image_url": "https://example.com/images/opening.jpg",
  "category": "events"
}
```

`description` and `category` are optional.

### Update image _(admin)_

```
PATCH /api/v1/gallery/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
Content-Type: application/json

{
  "category": "portfolio"
}
```

### Delete image _(admin)_

```
DELETE /api/v1/gallery/{id}
Authorization: Bearer <token>
X-CSRF-Token: <csrf>
```

---

## Publishes (unified feed)

A single read-only endpoint that merges **published news** and **concluded services** into one chronological list, sorted newest-first. No auth required.

```
GET /api/v1/publishes/
```

**Response — example**

```json
[
  {
    "type": "news",
    "ref_id": 3,
    "title": "We opened a new office",
    "summary": "Short description of the news item.",
    "image_url": "https://example.com/img.jpg",
    "date": "2026-04-01T10:00:00Z"
  },
  {
    "type": "service",
    "ref_id": 7,
    "title": "Brand Identity for Acme Co.",
    "summary": "Full brand redesign including logo, typography...",
    "image_url": null,
    "date": "2026-03-15T00:00:00Z"
  }
]
```

Use `type` to decide where to link:
- `"news"` → fetch full content from `GET /api/v1/news/{ref_id}`
- `"service"` → fetch full content from `GET /api/v1/services/{ref_id}`

---

## Error responses

| Status | Meaning |
|---|---|
| `401 Unauthorized` | Missing, invalid, or expired JWT |
| `403 Forbidden` | JWT valid but CSRF token missing or wrong |
| `404 Not Found` | Resource does not exist |
| `409 Conflict` | Unique constraint violated (e.g. duplicate news slug) |
| `400 Bad Request` | Validation error |

---

## Environment variables reference

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | _(insecure default)_ | Signs JWTs — use `openssl rand -hex 32` |
| `ADMIN_USERNAME` | `admin` | Admin login username |
| `ADMIN_PASSWORD_HASH` | _(placeholder)_ | Bcrypt hash of the admin password |
| `DATABASE_URL` | `sqlite:///.../database.db` | SQLAlchemy database URL |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | JWT + CSRF token lifetime in minutes |
