# Reactive Recipes

```
npm install
npm run dev
```

[Reactive Recipes](http://localhost:5173)

## Useful links

- [json-server](https://github.com/typicode/json-server)
- [concurrently](https://github.com/open-cli-tools/concurrently)
- [RapidAPI](https://rapidapi.com)

## RapidAPI and Tasty

You need to create a [RapidAPI](https://rapidapi.com) account and subscribe to the [tasty](https://rapidapi.com/apidojo/api/tasty) API.

Create an `.env.local` file with the following fields:

```bash
VITE_RAPID_API_HOST=tasty.p.rapidapi.com
VITE_RAPID_API_KEY=<your api key>
```

Tasty has a very limited free account, so you may run out of requests quite quickly, use the [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard) to monitor your usage.

## Mutations

Access to mutation results is global, but each mutation result requires a correlation id to be de-referenced. Using the [useId](https://react.dev/reference/react/useId) hook from within a React component, it is possible to virtually have "private" mutations, local only to the component that triggers them.

> For example, see [RemoveFavorite](src/favorites/RemoveFavorite.tsx).

## Todo

- [ ] Error handling
