# Authentication Module

This module handles user authentication using AWS Cognito.

## Features

- AWS Cognito integration for user authentication
- JWT token management
- Secure HTTP-only cookies for token storage
- Database user validation
- Support for NEW_PASSWORD_REQUIRED challenge

## API Endpoints

### POST /auth/login

Authenticates a user with AWS Cognito and sets authentication cookies.

**Request Body:**
```json
{
  "username": "user@example.com",
  "password": "userPassword123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "User authenticated successfully",
  "data": {
    "username": "user@example.com",
    "role": "admin",
    "email": "user@example.com",
    "phone_number": "+1234567890"
  }
}
```

**Cookies Set:**
- `idToken` - ID token (2 hours expiry)
- `accessToken` - Access token (2 hours expiry)
- `refreshToken` - Refresh token (30 days expiry)
- `username` - Username (30 days expiry)

**Password Challenge Response (200 OK):**
```json
{
  "success": true,
  "message": "User authenticated successfully",
  "data": {
    "challengeName": "NEW_PASSWORD_REQUIRED"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Failed to authenticate user.",
  "error": "UnauthorizedException"
}
```

**Error Response (403 Forbidden):**
```json
{
  "success": false,
  "message": "User does not exist in the database.",
  "error": "ForbiddenException"
}
```

### POST /auth/logout

Logs out the user by clearing all authentication cookies.

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

## Environment Variables

Required environment variables in `.env` file:

```env
# AWS Configuration
AWS_REGION=eu-west-2

# AWS Cognito Configuration
USER_POOL_ID=eu-west-2_btfIMPOLw
COGNITO_CLIENT_ID=78m7hu93mlilguj53mo504tsrl
APP_NAME=SouthernWaterNovus

# Cookie Configuration
COOKIE_SECRET=your-cookie-secret-key-here

# Server Configuration
NODE_ENV=development
```

## Database Requirements

The `users` table must have the following columns:
- `cognito_username` - Cognito username (unique)
- `email` - User email (unique)
- `role_name` - User role (optional)

## Authentication Flow

1. User submits username and password
2. System authenticates with AWS Cognito using ADMIN_NO_SRP_AUTH flow
3. If authentication succeeds:
   - Decode JWT token to extract user information
   - Verify user exists in database (by cognito_username or email)
   - Set HTTP-only cookies with tokens
   - Return user information
4. If password change required:
   - Return challenge name for frontend to handle

## Security Features

- HTTP-only cookies prevent XSS attacks
- Secure flag enabled in production
- SameSite=lax for CSRF protection
- Token expiry management
- Database validation before granting access

## Usage Example

```typescript
// Login request
const response = await fetch('http://localhost:3001/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    username: 'user@example.com',
    password: 'password123',
  }),
});

const data = await response.json();
console.log(data);
```

## Error Handling

All errors are caught and returned in a standardized format:
- `success`: false
- `message`: Human-readable error message
- `error`: Error type/name

Common error scenarios:
- Invalid credentials (401)
- User not in database (403)
- Cognito service error (500)
- Missing required fields (400)
