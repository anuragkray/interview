# Web Storage API

Web Storage API provides mechanisms by which browsers can store key/value pairs in a much more intuitive way than using cookies.

---

## Session Storage

Session Storage maintains a separate storage area where data is stored temporarily.

### Characteristics

1. **Short-term storage** - Data persists only for the duration of the page session
2. **Single page session** - Stores temporary data for a single page session
3. **Auto-cleanup** - Data is removed when the browser or tab is closed
4. **Security** - Ideal for storing private information like authentication tokens or session IDs
5. **Tab-scoped** - Accessible only from the specific tab/window
6. **Client-side only** - No server-side access

### API Methods

```javascript
// Setting data
sessionStorage.setItem("key", JSON.stringify({name:"",value:null}));

// Getting data
const storage = sessionStorage.getItem("key");
const data = JSON.parse(storage);

// Removing specific item
sessionStorage.removeItem("key");

// Clearing all data
sessionStorage.clear();
```

### Use Cases

1. **Single Page Applications (SPA)** - Maintain state during navigation
2. **Temporary Form Data** - Store data temporarily while filling out forms
3. **User Session Management** - Track user actions during a session
4. **Multi-Step Forms** - Store progress in multi-step forms
5. **Tab-Specific Data** - Save data specific to a single tab

---

## Local Storage

Local Storage allows you to store data persistently in the user's browser.

### Characteristics

1. **Persistent storage** - Data does not expire even after closing the browser or tab
2. **Key-value pairs** - Stores data in key-value format
3. **Storage capacity** - Typically 5-10 MB of storage space
4. **Client-side only** - Not modified by the server
5. **Cross-tab accessible** - Accessible from any tab in the browser

### API Methods

```javascript
// Setting data
localStorage.setItem("key", "value");

// Getting data
localStorage.getItem("key");

// Removing specific item
localStorage.removeItem("key");

// Clearing all data
localStorage.clear();
```

### Use Cases

1. **User Preferences** - Store user-selected theme or language settings
2. **Shopping Cart** - Persist shopping cart data across sessions
3. **Offline Access** - Cache application data for offline access, mainly in Progressive Web Apps (PWA)
   - PWAs combine the best features of web and mobile applications, allowing for web page functionality, improved performance, and a more app-like user experience

---

## Cookies

Cookies are data stored in small text files on your computer.

### Overview

When a web server sends a web page to a browser, the connection is shut down, and the server forgets everything about the user. Cookies were invented to solve the problem of "how to remember information about the user."

### How Cookies Work

- When a user visits a web page, their name can be stored in a cookie
- Next time the user visits the page, the cookie "remembers" their name

### Cookie Syntax

Cookies are saved in name-value pairs:

```javascript
// Setting a cookie
document.cookie = "key=value; expires=date; path=/";

// Getting a cookie
let value = document.cookie.split(";").find(row => row.startsWith("key="));

// Deleting a cookie (set expiry to past date)
document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
```

---

## Comparison Table

| Feature | Session Storage | Local Storage | Cookies |
|---------|----------------|---------------|---------|
| **Persistence** | Until tab/browser closes | Permanent (until manually cleared) | Until expiration date |
| **Capacity** | ~5-10 MB | ~5-10 MB | ~4 KB |
| **Accessibility** | Same tab only | All tabs/windows | All tabs/windows |
| **Server Access** | No | No | Yes (sent with HTTP requests) |
| **Expiration** | On tab/browser close | Never | Configurable |
| **Use Case** | Temporary session data | Long-term client data | Server-client communication |

---

## Best Practices

1. **Don't store sensitive data** - Avoid storing passwords or credit card information
2. **Use appropriate storage** - Choose the right storage mechanism based on your needs
3. **Handle errors** - Always wrap storage operations in try-catch blocks
4. **Check availability** - Verify storage is available before using it
5. **Clean up** - Remove unnecessary data to avoid filling up storage space
