### What to do to run this in development...

1. `yarn` to install all the dependencies
2. set the "proxy" value in `package.json` to point to the server
3. the REST api should respond with the results as presented in `./src/components/contacts/fixtures`. Each file is named by method.

#### List of methods by end point
 * GET /contacts - Fetch list of contacts
 * GET /contacts/:id - Get a single contact
 * POST /contacts - Add new contact
 * PUT /contacts/:id - Update a contact
 * DELETE /contacts/:id - Delete a contact

