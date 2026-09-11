# Website

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.

## Content backend (Appwrite)

Books, projects and blog posts are read from [Appwrite](https://appwrite.io) at
runtime. Before the site will show anything, fill in the placeholders at the top
of [`src/appwrite.ts`](src/appwrite.ts):

- `APPWRITE_ENDPOINT` — your region's Cloud endpoint, e.g. `https://fra.cloud.appwrite.io/v1`
- `APPWRITE_PROJECT_ID` — from Appwrite console → project settings
- `APPWRITE_DATABASE_ID` — the database holding the three tables below

These values are public by design (the web SDK runs in the browser); access is
controlled by table permissions, not by hiding them. Add your site's domain
under **project settings → platforms → Web** so the SDK is allowed to call the
API, and grant **Read** to the **Any** role on each table so visitors can load
content without signing in.

### Tables

Create a database with three tables — `books`, `projects`, `blogs` — with these
columns. The row `$id` is used as the URL segment (`/philosophy/:id`,
`/projects/:id`, `/blogs/:id`), so give rows readable custom IDs.

**`books`**

| Column | Type | Required |
| --- | --- | --- |
| `bookName` | String | yes |
| `authorName` | String | yes |
| `description` | String (long) | yes |
| `image` | String (URL) | yes |
| `note` | String | no |

**`projects`**

| Column | Type | Required |
| --- | --- | --- |
| `projectName` | String | yes |
| `description` | String (long) | yes |
| `image` | String (URL) | yes |
| `tags` | String, **array** | no |
| `links` | String (long) | no |

`links` holds a JSON object as a string, e.g.
`{"github":"https://github.com/...","demo":"https://..."}` — Appwrite has no map
column type. Invalid JSON is logged and treated as "no links".

**`blogs`**

| Column | Type | Required |
| --- | --- | --- |
| `title` | String | yes |
| `excerpt` | String (long) | yes |
| `date` | String (ISO date, e.g. `2026-04-18`) | yes |
| `image` | String (URL) | no |
| `body` | String (long), **array** | no |

`body` is one string per paragraph. The Writing page lists posts newest-first,
which needs an index on `date` for the sort to work.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
