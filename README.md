I spend all my time building functionality, that's why I didn't style it. I would have just installed bootstrap v4, with mdbootstrap (because I love Material), with a list group and some form elements.

If we were dealing with multiple data types, i'd make a combined "data" reducer and possibly make use of the "redux-actions" library.

If I were to continue, I would want to make sure errors were pushed to the user, as well as interim statuses when calling actions.

### What to do to run this in development...
1. `yarn` to install all the dependencies
2. set the "proxy" value in `package.json` to point to the server
3. the REST api should respond with the results as presented in `./src/components/contacts/fixtures`. Each file is named by method.

#### List of methods by end point
 * GET /contacts - Fetch list of contacts
 * GET /contacts/:id - Get a single contact
 * POST /contacts - Add new contact
 * PATCH /contacts/:id - Update a contact
 * DELETE /contacts/:id - Delete a contact

