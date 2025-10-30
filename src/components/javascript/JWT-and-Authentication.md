# JWT and Authentication - Complete Guide

A comprehensive guide to JSON Web Tokens (JWT) and modern authentication strategies.

---

## Table of Contents

1. [What is Authentication?](#what-is-authentication)
2. [Authentication vs Authorization](#authentication-vs-authorization)
3. [Traditional Session-Based Authentication](#traditional-session-based-authentication)
4. [Token-Based Authentication](#token-based-authentication)
5. [JSON Web Tokens (JWT)](#json-web-tokens-jwt)
6. [JWT Structure](#jwt-structure)
7. [How JWT Works](#how-jwt-works)
8. [JWT Implementation](#jwt-implementation)
9. [Access Tokens vs Refresh Tokens](#access-tokens-vs-refresh-tokens)
10. [Security Best Practices](#security-best-practices)
11. [Common Vulnerabilities](#common-vulnerabilities)
12. [OAuth 2.0 and OpenID Connect](#oauth-20-and-openid-connect)
13. [Comparison Table](#comparison-table)

---

## What is Authentication?

**Authentication** is the process of verifying the identity of a user, device, or system. It answers the question: **"Who are you?"**

### Common Authentication Methods

1. **Password-based** - Username and password
2. **Multi-Factor Authentication (MFA)** - Multiple verification methods
3. **Biometric** - Fingerprint, face recognition, iris scan
4. **Token-based** - JWT, OAuth tokens
5. **Certificate-based** - Digital certificates
6. **Single Sign-On (SSO)** - One login for multiple applications

---

## Authentication vs Authorization

| Aspect | Authentication | Authorization |
|--------|---------------|---------------|
| **Question** | "Who are you?" | "What can you do?" |
| **Purpose** | Verify identity | Grant permissions |
| **Process** | Login with credentials | Check access rights |
| **When** | Before authorization | After authentication |
| **Example** | User logs in with password | User can edit their profile but not others' |
| **Failure** | Access denied | Permission denied |

### Example Flow

```
1. User enters username/password → Authentication
2. System verifies credentials → Authentication Success
3. User tries to access admin panel → Authorization Check
4. System checks user role → Authorization Decision
```

---

## Traditional Session-Based Authentication

### How It Works

1. User submits login credentials
2. Server validates credentials
3. Server creates a session and stores it in memory/database
4. Server sends session ID to client as a cookie
5. Client sends session ID with each request
6. Server validates session ID and retrieves user data

### Session Flow Diagram

```
Client                          Server                    Database
  |                               |                           |
  |---(1) Login Credentials------>|                           |
  |                               |---(2) Validate User)----->|
  |                               |<--(3) User Data-----------|
  |                               |                           |
  |                               |---(4) Create Session)---->|
  |<--(5) Session ID (Cookie)-----|                           |
  |                               |                           |
  |---(6) Request + Session ID--->|                           |
  |                               |---(7) Validate Session)-->|
  |                               |<--(8) Session Data--------|
  |<--(9) Response----------------|                           |
```

### Advantages

✅ Simple to implement  
✅ Server has full control  
✅ Easy to revoke sessions  
✅ Secure when implemented correctly

### Disadvantages

❌ Server must store session data (memory/database)  
❌ Difficult to scale horizontally  
❌ CSRF vulnerabilities  
❌ Not ideal for mobile apps  
❌ Requires sticky sessions in load-balanced environments

### Code Example

```javascript
// Server-side (Node.js/Express)
const express = require('express');
const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true,      // HTTPS only
    httpOnly: true,    // Prevent XSS
    maxAge: 3600000    // 1 hour
  }
}));

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Validate credentials
  if (validateUser(username, password)) {
    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected route
app.get('/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ user: req.session.username });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});
```

---

## Token-Based Authentication

### How It Works

1. User submits login credentials
2. Server validates credentials
3. Server generates a token (JWT)
4. Server sends token to client
5. Client stores token (localStorage/sessionStorage)
6. Client sends token in Authorization header with each request
7. Server validates token and extracts user data

### Token Flow Diagram

```
Client                          Server
  |                               |
  |---(1) Login Credentials------>|
  |                               |---(2) Validate User)
  |                               |---(3) Generate JWT)
  |<--(4) JWT Token---------------|
  |                               |
  | (Store token in localStorage) |
  |                               |
  |---(5) Request + JWT---------->|
  |     (Authorization: Bearer)   |
  |                               |---(6) Verify JWT)
  |                               |---(7) Extract User Data)
  |<--(8) Response----------------|
```

### Advantages

✅ Stateless - no server-side storage needed  
✅ Scalable - works well with microservices  
✅ Cross-domain/CORS friendly  
✅ Mobile-friendly  
✅ No CSRF vulnerabilities (when stored properly)  
✅ Can contain user data (claims)

### Disadvantages

❌ Token size larger than session ID  
❌ Cannot revoke tokens easily (until expiration)  
❌ XSS vulnerabilities if not stored properly  
❌ Token theft concerns  
❌ Need refresh token mechanism for long sessions

---

## JSON Web Tokens (JWT)

### What is JWT?

JWT (JSON Web Token) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

### Key Characteristics

- **Compact** - Small size, can be sent via URL, POST parameter, or HTTP header
- **Self-contained** - Contains all necessary information about the user
- **Digitally signed** - Can be verified and trusted
- **Stateless** - No server-side storage required

---

## JWT Structure

A JWT consists of three parts separated by dots (`.`):

```
xxxxx.yyyyy.zzzzz
```

### 1. Header

Contains the token type and hashing algorithm.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Encoded:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`

### 2. Payload (Claims)

Contains the claims (user data and metadata).

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}
```

**Encoded:** `eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9`

### 3. Signature

Ensures the token hasn't been tampered with.

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

**Encoded:** `SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`

### Complete JWT Example

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Standard Claims

| Claim | Name | Description |
|-------|------|-------------|
| `iss` | Issuer | Who issued the token |
| `sub` | Subject | User identifier |
| `aud` | Audience | Who the token is intended for |
| `exp` | Expiration Time | When the token expires (Unix timestamp) |
| `nbf` | Not Before | Token not valid before this time |
| `iat` | Issued At | When the token was issued |
| `jti` | JWT ID | Unique identifier for the token |

### Custom Claims

You can add any custom data:

```json
{
  "userId": "12345",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "admin",
  "permissions": ["read", "write", "delete"],
  "department": "Engineering"
}
```

---

## How JWT Works

### Complete Authentication Flow

```
┌─────────┐                                           ┌─────────┐
│         │  1. POST /login                           │         │
│         │  { username, password }                   │         │
│         │──────────────────────────────────────────>│         │
│         │                                           │         │
│         │  2. Validate credentials                  │         │
│         │     Check database                        │ Server  │
│ Client  │                                           │         │
│         │  3. Generate JWT                          │         │
│         │     Sign with secret key                  │         │
│         │                                           │         │
│         │<──────────────────────────────────────────│         │
│         │  4. Return JWT                            │         │
│         │  { token: "eyJhbG..." }                   │         │
│         │                                           │         │
│         │  5. Store token                           │         │
│         │     localStorage.setItem('token', ...)    │         │
│         │                                           │         │
│         │  6. GET /api/protected                    │         │
│         │  Authorization: Bearer eyJhbG...          │         │
│         │──────────────────────────────────────────>│         │
│         │                                           │         │
│         │  7. Verify JWT signature                  │         │
│         │     Decode and validate                   │         │
│         │     Check expiration                      │         │
│         │                                           │         │
│         │<──────────────────────────────────────────│         │
│         │  8. Return protected data                 │         │
│         │  { data: {...} }                          │         │
└─────────┘                                           └─────────┘
```

---

## JWT Implementation

### Server-Side (Node.js)

```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

// Generate Access Token
function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
}

// Generate Refresh Token
function generateRefreshToken(user) {
  return jwt.sign(
    { userId: user.id },
    SECRET_KEY,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
}

// Login Route
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    
    // Store refresh token in database
    await user.updateRefreshToken(refreshToken);
    
    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      return res.status(403).json({ error: 'Invalid token' });
    }
    
    req.user = user;
    next();
  });
}

// Protected Route
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    user: req.user
  });
});

// Refresh Token Route
app.post('/api/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(401).json({ error: 'Refresh token required' });
  }
  
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, SECRET_KEY);
    
    // Check if refresh token exists in database
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    
    // Generate new access token
    const accessToken = generateAccessToken(user);
    
    res.json({ accessToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token expired' });
    }
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

// Logout Route
app.post('/api/logout', authenticateToken, async (req, res) => {
  try {
    // Remove refresh token from database
    await User.findByIdAndUpdate(req.user.userId, { refreshToken: null });
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
```

### Client-Side (JavaScript/React)

```javascript
// Auth Service
class AuthService {
  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  // Login
  async login(username, password) {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store tokens
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      this.accessToken = data.accessToken;
      this.refreshToken = data.refreshToken;
      
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      this.accessToken = null;
      this.refreshToken = null;
    }
  }

  // Refresh Access Token
  async refreshAccessToken() {
    try {
      const response = await fetch('/api/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken: this.refreshToken })
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      localStorage.setItem('accessToken', data.accessToken);
      this.accessToken = data.accessToken;
      
      return data.accessToken;
    } catch (error) {
      // Refresh token expired, logout user
      this.logout();
      throw error;
    }
  }

  // Make authenticated request
  async authenticatedFetch(url, options = {}) {
    // Add authorization header
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${this.accessToken}`
    };

    let response = await fetch(url, options);

    // If token expired, try to refresh
    if (response.status === 401) {
      try {
        await this.refreshAccessToken();
        
        // Retry request with new token
        options.headers['Authorization'] = `Bearer ${this.accessToken}`;
        response = await fetch(url, options);
      } catch (error) {
        throw new Error('Authentication failed');
      }
    }

    return response;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.accessToken;
  }

  // Get current user
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

// Usage Example
const authService = new AuthService();

// Login
async function handleLogin() {
  try {
    const data = await authService.login('username', 'password');
    console.log('Logged in:', data.user);
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// Make authenticated request
async function fetchUserProfile() {
  try {
    const response = await authService.authenticatedFetch('/api/profile');
    const data = await response.json();
    console.log('Profile:', data);
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
}

// Logout
async function handleLogout() {
  await authService.logout();
  console.log('Logged out');
}
```

### React Hook Example

```javascript
import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    const token = localStorage.getItem('accessToken');
    
    await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Usage in component
function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## Access Tokens vs Refresh Tokens

### Why Use Both?

Using both access and refresh tokens provides a balance between security and user experience.

### Access Token

**Purpose:** Short-lived token for accessing protected resources

**Characteristics:**
- Short expiration time (5-15 minutes)
- Contains user information and permissions
- Sent with every API request
- Stored in memory or localStorage

**Why Short-Lived?**
- Limits damage if token is stolen
- Reduces window of opportunity for attackers
- Forces regular re-validation

### Refresh Token

**Purpose:** Long-lived token for obtaining new access tokens

**Characteristics:**
- Long expiration time (days/weeks)
- Contains minimal information (usually just user ID)
- Used only to get new access tokens
- Stored securely (httpOnly cookie or secure storage)
- Can be revoked by server

**Why Long-Lived?**
- Better user experience (no frequent logins)
- Can be revoked if compromised
- Stored more securely than access tokens

### Token Rotation Flow

```
┌─────────┐                                    ┌─────────┐
│ Client  │                                    │ Server  │
└────┬────┘                                    └────┬────┘
     │                                              │
     │  1. Login with credentials                  │
     │─────────────────────────────────────────────>│
     │                                              │
     │  2. Return Access Token (15m) +              │
     │     Refresh Token (7d)                       │
     │<─────────────────────────────────────────────│
     │                                              │
     │  3. Use Access Token for requests            │
     │─────────────────────────────────────────────>│
     │<─────────────────────────────────────────────│
     │                                              │
     │  ... 15 minutes later ...                    │
     │                                              │
     │  4. Access Token expired                     │
     │─────────────────────────────────────────────>│
     │<─────────────────────────────────────────────│
     │     401 Unauthorized                         │
     │                                              │
     │  5. Send Refresh Token                       │
     │─────────────────────────────────────────────>│
     │                                              │
     │  6. Return new Access Token                  │
     │     (optionally new Refresh Token)           │
     │<─────────────────────────────────────────────│
     │                                              │
     │  7. Continue with new Access Token           │
     │─────────────────────────────────────────────>│
     │<─────────────────────────────────────────────│
```

### Token Storage Comparison

| Storage Location | Access Token | Refresh Token | Security Level |
|-----------------|--------------|---------------|----------------|
| **localStorage** | ⚠️ Common | ❌ Not recommended | Low (XSS vulnerable) |
| **sessionStorage** | ⚠️ Acceptable | ❌ Not recommended | Low (XSS vulnerable) |
| **Memory (state)** | ✅ Best | ❌ Lost on refresh | High |
| **httpOnly Cookie** | ✅ Good | ✅ Best | High (XSS protected) |
| **Secure Cookie** | ✅ Good | ✅ Best | Highest |

### Best Practice: Hybrid Approach

```javascript
// Store access token in memory
let accessToken = null;

// Store refresh token in httpOnly cookie (set by server)
// Client cannot access it via JavaScript

// On page load, use refresh token to get new access token
async function initializeAuth() {
  try {
    const response = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include' // Send httpOnly cookie
    });
    
    const data = await response.json();
    accessToken = data.accessToken;
  } catch (error) {
    // Redirect to login
  }
}
```

---

## Security Best Practices

### 1. Use HTTPS Always

```javascript
// Enforce HTTPS in production
if (process.env.NODE_ENV === 'production' && req.protocol !== 'https') {
  return res.redirect('https://' + req.hostname + req.url);
}
```

### 2. Strong Secret Keys

```javascript
// Use cryptographically strong secrets
const crypto = require('crypto');
const SECRET_KEY = crypto.randomBytes(64).toString('hex');

// Store in environment variables
// Never hardcode secrets in code
const SECRET_KEY = process.env.JWT_SECRET;
```

### 3. Token Expiration

```javascript
// Short-lived access tokens
const ACCESS_TOKEN_EXPIRY = '15m';

// Longer refresh tokens
const REFRESH_TOKEN_EXPIRY = '7d';

// Always set expiration
jwt.sign(payload, secret, { expiresIn: ACCESS_TOKEN_EXPIRY });
```

### 4. Validate Token Claims

```javascript
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    
    // Validate claims
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    if (decoded.iss !== 'your-app-name') {
      return res.status(403).json({ error: 'Invalid issuer' });
    }
    
    req.user = decoded;
    next();
  });
}
```

### 5. Implement Token Blacklist

```javascript
// For logout or token revocation
const tokenBlacklist = new Set();

function blacklistToken(token) {
  tokenBlacklist.add(token);
  
  // Remove from blacklist after expiration
  const decoded = jwt.decode(token);
  const expiresIn = (decoded.exp * 1000) - Date.now();
  setTimeout(() => tokenBlacklist.delete(token), expiresIn);
}

function isTokenBlacklisted(token) {
  return tokenBlacklist.has(token);
}

// Use in middleware
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (isTokenBlacklisted(token)) {
    return res.status(401).json({ error: 'Token has been revoked' });
  }
  
  // Continue with verification...
}
```

### 6. Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Too many login attempts, please try again later'
});

app.post('/api/login', loginLimiter, async (req, res) => {
  // Login logic
});
```

### 7. Password Hashing

```javascript
const bcrypt = require('bcrypt');

// Hash password before storing
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Verify password
async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

// Usage
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  
  const hashedPassword = await hashPassword(password);
  
  await User.create({
    username,
    password: hashedPassword
  });
});
```

### 8. Input Validation

```javascript
const validator = require('validator');

function validateLoginInput(username, password) {
  const errors = {};
  
  if (!username || username.trim() === '') {
    errors.username = 'Username is required';
  }
  
  if (!password || password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  if (validator.contains(password, ' ')) {
    errors.password = 'Password cannot contain spaces';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Usage
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const validation = validateLoginInput(username, password);
  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }
  
  // Continue with login...
});
```

### 9. CORS Configuration

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 10. Secure Headers

```javascript
const helmet = require('helmet');

app.use(helmet());

// Custom security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});
```

---

## Common Vulnerabilities

### 1. Cross-Site Scripting (XSS)

**Attack:** Injecting malicious scripts into web pages

**Prevention:**
```javascript
// Sanitize user input
const DOMPurify = require('dompurify');

function sanitizeInput(input) {
  return DOMPurify.sanitize(input);
}

// Use httpOnly cookies for tokens
res.cookie('refreshToken', token, {
  httpOnly: true,  // Cannot be accessed via JavaScript
  secure: true,    // HTTPS only
  sameSite: 'strict'
});

// Content Security Policy
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"]
  }
}));
```

### 2. Cross-Site Request Forgery (CSRF)

**Attack:** Unauthorized commands transmitted from a user that the web application trusts

**Prevention:**
```javascript
const csrf = require('csurf');

// CSRF protection for session-based auth
const csrfProtection = csrf({ cookie: true });

app.post('/api/transfer', csrfProtection, (req, res) => {
  // Process transfer
});

// For JWT: Use custom headers
// Browsers won't send custom headers in CSRF attacks
app.use((req, res, next) => {
  const token = req.headers['x-requested-with'];
  if (!token || token !== 'XMLHttpRequest') {
    return res.status(403).json({ error: 'Invalid request' });
  }
  next();
});
```

### 3. SQL Injection

**Attack:** Inserting malicious SQL code into queries

**Prevention:**
```javascript
// Use parameterized queries
const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
db.execute(query, [username, password]);

// Use ORM (Object-Relational Mapping)
const user = await User.findOne({ 
  where: { username: username } 
});

// Validate and sanitize input
const validator = require('validator');

if (!validator.isAlphanumeric(username)) {
  return res.status(400).json({ error: 'Invalid username' });
}
```

### 4. Brute Force Attacks

**Attack:** Trying many passwords to guess the correct one

**Prevention:**
```javascript
const rateLimit = require('express-rate-limit');

// Limit login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  skipSuccessfulRequests: true,
  message: 'Too many login attempts'
});

// Account lockout after failed attempts
let failedAttempts = {};

app.post('/api/login', loginLimiter, async (req, res) => {
  const { username, password } = req.body;
  
  // Check if account is locked
  if (failedAttempts[username] >= 5) {
    return res.status(429).json({ 
      error: 'Account locked. Try again in 15 minutes' 
    });
  }
  
  const user = await User.findOne({ username });
  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    failedAttempts[username] = (failedAttempts[username] || 0) + 1;
    
    // Reset after 15 minutes
    setTimeout(() => {
      delete failedAttempts[username];
    }, 15 * 60 * 1000);
    
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Reset failed attempts on successful login
  delete failedAttempts[username];
  
  // Continue with login...
});
```

### 5. Token Theft

**Attack:** Stealing JWT tokens from storage

**Prevention:**
```javascript
// 1. Use httpOnly cookies for refresh tokens
res.cookie('refreshToken', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});

// 2. Store access tokens in memory (React state)
// Don't use localStorage for sensitive tokens

// 3. Implement token rotation
app.post('/api/refresh', async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;
  
  // Verify old token
  const decoded = jwt.verify(oldRefreshToken, SECRET_KEY);
  
  // Generate new tokens
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  
  // Invalidate old refresh token
  await invalidateToken(oldRefreshToken);
  
  // Send new tokens
  res.cookie('refreshToken', newRefreshToken, { httpOnly: true });
  res.json({ accessToken: newAccessToken });
});

// 4. Detect token reuse
const usedTokens = new Set();

function detectTokenReuse(token) {
  if (usedTokens.has(token)) {
    // Token reuse detected - possible attack
    // Invalidate all user sessions
    return true;
  }
  usedTokens.add(token);
  return false;
}
```

### 6. Man-in-the-Middle (MITM)

**Attack:** Intercepting communication between client and server

**Prevention:**
```javascript
// 1. Always use HTTPS
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

// 2. HTTP Strict Transport Security (HSTS)
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));

// 3. Certificate pinning (for mobile apps)
// Verify server certificate matches expected certificate
```

---

## OAuth 2.0 and OpenID Connect

### What is OAuth 2.0?

OAuth 2.0 is an authorization framework that enables applications to obtain limited access to user accounts on an HTTP service.

### OAuth 2.0 Flow

```
┌──────────┐                                      ┌───────────────┐
│          │                                      │               │
│  Client  │                                      │ Authorization │
│   App    │                                      │    Server     │
│          │                                      │   (Google,    │
└────┬─────┘                                      │   Facebook)   │
     │                                            └───────┬───────┘
     │                                                    │
     │  1. Request authorization                         │
     │───────────────────────────────────────────────────>│
     │                                                    │
     │  2. User logs in and grants permission            │
     │                                                    │
     │  3. Authorization code                            │
     │<───────────────────────────────────────────────────│
     │                                                    │
     │  4. Exchange code for access token                │
     │───────────────────────────────────────────────────>│
     │                                                    │
     │  5. Access token + Refresh token                  │
     │<───────────────────────────────────────────────────│
     │                                                    │
     │                                            ┌───────┴───────┐
     │  6. Request user data with access token   │               │
     │──────────────────────────────────────────>│   Resource    │
     │                                            │    Server     │
     │  7. User data                              │   (API)       │
     │<──────────────────────────────────────────│               │
     │                                            └───────────────┘
```

### OAuth 2.0 Implementation (Google)

```javascript
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create user
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0].value
        });
      }
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Generate JWT for your app
    const token = generateAccessToken(req.user);
    res.redirect(`/dashboard?token=${token}`);
  }
);
```

### OpenID Connect

OpenID Connect is an identity layer built on top of OAuth 2.0 that adds authentication.

**Key Difference:**
- **OAuth 2.0:** Authorization (what you can access)
- **OpenID Connect:** Authentication (who you are) + Authorization

```javascript
// OpenID Connect adds an ID token
{
  "access_token": "eyJhbGc...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "eyJhbGc...",
  "id_token": "eyJhbGc..."  // ← ID token contains user info
}

// ID Token payload
{
  "iss": "https://accounts.google.com",
  "sub": "110169484474386276334",
  "aud": "your-client-id",
  "exp": 1516239022,
  "iat": 1516235422,
  "name": "John Doe",
  "email": "john@example.com",
  "picture": "https://..."
}
```

---

## Comparison Table

### Session vs JWT

| Feature | Session-Based | JWT-Based |
|---------|--------------|-----------|
| **Storage** | Server-side | Client-side |
| **Scalability** | Difficult (requires shared storage) | Easy (stateless) |
| **Performance** | Database lookup on each request | No database lookup |
| **Revocation** | Easy (delete session) | Difficult (need blacklist) |
| **Size** | Small (session ID only) | Larger (contains data) |
| **CSRF** | Vulnerable | Not vulnerable (if stored properly) |
| **XSS** | Less vulnerable (httpOnly cookies) | Vulnerable (if in localStorage) |
| **Mobile Apps** | Not ideal | Ideal |
| **Microservices** | Difficult | Easy |
| **Expiration** | Server controls | Token controls |

### Storage Options

| Storage | Security | Persistence | Size Limit | Use Case |
|---------|----------|-------------|------------|----------|
| **localStorage** | Low (XSS) | Permanent | ~5-10 MB | Non-sensitive data |
| **sessionStorage** | Low (XSS) | Tab session | ~5-10 MB | Temporary data |
| **Cookies** | Medium-High | Configurable | ~4 KB | Session IDs, tokens |
| **httpOnly Cookies** | High | Configurable | ~4 KB | Refresh tokens |
| **Memory (State)** | Highest | Page session | Unlimited | Access tokens |

### Authentication Methods

| Method | Security | UX | Complexity | Best For |
|--------|----------|-----|------------|----------|
| **Password** | Medium | Good | Low | General use |
| **MFA** | High | Medium | Medium | Sensitive operations |
| **Biometric** | High | Excellent | High | Mobile apps |
| **OAuth/SSO** | High | Excellent | Medium | Third-party login |
| **Magic Link** | Medium | Good | Low | Passwordless |
| **Certificate** | Very High | Poor | High | Enterprise |

---

## Summary

### Key Takeaways

1. **Authentication vs Authorization**
   - Authentication = Who you are
   - Authorization = What you can do

2. **Session vs Token**
   - Sessions: Server-side storage, easy revocation
   - Tokens: Stateless, scalable, mobile-friendly

3. **JWT Best Practices**
   - Use short-lived access tokens (15 minutes)
   - Use long-lived refresh tokens (7 days)
   - Store refresh tokens in httpOnly cookies
   - Store access tokens in memory
   - Always use HTTPS
   - Implement token rotation

4. **Security Essentials**
   - Hash passwords with bcrypt
   - Use strong secret keys
   - Implement rate limiting
   - Validate all inputs
   - Use HTTPS always
   - Set proper CORS policies
   - Implement CSRF protection
   - Sanitize user input

5. **Common Pitfalls to Avoid**
   - Storing sensitive tokens in localStorage
   - Using weak secret keys
   - Not setting token expiration
   - Not validating token claims
   - Ignoring HTTPS in production
   - Not implementing rate limiting
   - Storing passwords in plain text

### Recommended Stack

**For Web Applications:**
- Access tokens in memory (React state)
- Refresh tokens in httpOnly cookies
- Short access token expiry (15 minutes)
- Longer refresh token expiry (7 days)
- Token rotation on refresh

**For Mobile Applications:**
- Secure storage for tokens
- Biometric authentication
- Token refresh mechanism
- Certificate pinning

**For Microservices:**
- JWT for stateless authentication
- API Gateway for centralized auth
- Service-to-service authentication
- Token validation at each service

---

## Additional Resources

- [JWT.io](https://jwt.io) - JWT debugger and documentation
