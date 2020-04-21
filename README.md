# Initialise server
1. Download necessary packages
    ```
    > npm install
    ```
2. Start the server
    ```
    > node server.js
    ```
3. Visit http://localhost:8000/

# Documentation
Please visit http://localhost:8000/apidoc/index.html for documentation

# Test
```
> npm test
```
Some tests append data to the data files and will fail if run more than once because of these changes. e.g. test to crate a new user.