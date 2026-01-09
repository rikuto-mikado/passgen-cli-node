# passgen-cli-node

A password generator CLI tool built with Node.js.

## Error Handling

This project uses different error handling approaches depending on the context:

### `throw new Error()` vs `alert()`

- **`throw new Error()`**: Used in Node.js/CLI environment (like `lib/generator.js`)
  - Throws an exception that can be caught by calling code
  - Standard JavaScript error handling mechanism
  - Works in both Node.js and browser environments
  - Example: `throw new Error("length must be a positive integer")`

- **`alert()`**: Browser-only function
  - Only available in web browsers (via `window.alert`)
  - Not available in Node.js/CLI applications
  - Shows a blocking dialog box to users
  - Not suitable for server-side or CLI applications

### `console.log()` with `chalk`

- Used in CLI entry point (`app.js`) for user-facing messages
- Provides colored output for better readability
- Example: `console.log(chalk.red("Error: ..."))`
- Used for validation errors before program execution

### When to use each:

| Method | Use Case | Location |
|--------|----------|----------|
| `throw new Error()` | Library/module code, reusable functions | `lib/generator.js` |
| `console.log()` + `chalk` | CLI user-facing messages | `app.js` |
| `alert()` | Browser UI only | Not used in this project |

## Conditional Expressions

### Type Checking and Validation Patterns

Different ways to validate data in JavaScript:

#### 1. `Number.isInteger()` with negation
```javascript
if (!Number.isInteger(length) || length <= 0) {
    throw new Error("length must be a positive integer");
}
```
- `!` negates the result (NOT operator)
- `Number.isInteger()` checks if value is an integer
- `||` is the OR operator (either condition fails)

#### 2. `typeof` operator
```javascript
if (typeof charset !== "string" || charset.length === 0) {
    throw new Error("charset must be a non-empty string");
}
```
- `typeof` returns the type as a string ("string", "number", "boolean", etc.)
- `!==` checks strict inequality
- Can also use: `===` (strict equality), `!=` (loose inequality), `==` (loose equality)

### Alternative Validation Patterns

| Pattern | Example | Use Case |
|---------|---------|----------|
| Negation | `!value` | Check if falsy (false, 0, "", null, undefined, NaN) |
| Double negation | `!!value` | Convert to boolean |
| Strict equality | `value === 10` | Check exact value and type |
| Type checking | `typeof value === "string"` | Validate type |
| Instance checking | `value instanceof Array` | Check object type |
| Truthy check | `if (value)` | Check if value exists and is truthy |
| Nullish check | `value ?? defaultValue` | Use default if null/undefined |

### if Statement Shorthand Syntax

#### 1. Ternary Operator (Most common shorthand)
```javascript
// Full if statement
if (length > 0) {
    result = "valid";
} else {
    result = "invalid";
}

// Ternary operator
result = length > 0 ? "valid" : "invalid";
```

#### 2. Logical AND (`&&`) - Execute if truthy
```javascript
// Full if statement
if (user) {
    console.log(user.name);
}

// Short-circuit with &&
user && console.log(user.name);
```

#### 3. Logical OR (`||`) - Default values
```javascript
// Full if statement
let charset;
if (providedCharset) {
    charset = providedCharset;
} else {
    charset = DEFAULT_CHARSET;
}

// Short-circuit with ||
let charset = providedCharset || DEFAULT_CHARSET;
```

#### 4. Nullish Coalescing (`??`) - Default for null/undefined only
```javascript
// Returns defaultValue only if value is null or undefined (not for 0 or "")
let result = value ?? defaultValue;
```

#### 5. Optional Chaining (`?.`) - Safe property access
```javascript
// Full if statement
if (user && user.address && user.address.city) {
    console.log(user.address.city);
}

// Optional chaining
console.log(user?.address?.city);
```

### When to Use Each:

- **Full if statement**: Complex logic, multiple statements, better readability
- **Ternary operator**: Simple value assignment based on condition
- **Logical operators (`&&`, `||`)**: Quick checks and default values
- **Nullish coalescing (`??`)**: Default values when 0 or "" are valid
- **Optional chaining (`?.`)**: Accessing nested properties safely
