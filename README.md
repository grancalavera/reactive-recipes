# Reactive Recipes

```
npm install
npm run dev
```

[Reactive Recipes](http://localhost:5173)

https://github.com/grancalavera/reactive-recipes/assets/301030/c7139949-7a51-489d-8965-a6627f61a170

## Useful links

- [json-server](https://github.com/typicode/json-server)
- [concurrently](https://github.com/open-cli-tools/concurrently)
- [RapidAPI](https://rapidapi.com)

## Reference Material

- For an intuition on how to design functional services, read [Domain Modeling Made Functional](https://pragprog.com/titles/swdddf/domain-modeling-made-functional/)
- For an intuition on what is considered a side effect, and how to compose side effects, watch [Duality and the End of Reactive](https://youtu.be/SVYGmGYXLpY?si=SC6OFZWVsHUSIXEBb)
- For an introduction to using finite state machines to describe user interfaces, read [Statecharts: a visual formalism for complex systems
  ](https://www.sciencedirect.com/science/article/pii/0167642387900359)

## RapidAPI and Tasty

You need to create a [RapidAPI](https://rapidapi.com) account and subscribe to the [tasty](https://rapidapi.com/apidojo/api/tasty) API.

Create an `.env.local` file at the root of the project and add following fields:

```bash
VITE_RAPID_API_HOST=tasty.p.rapidapi.com
VITE_RAPID_API_KEY=<your api key>
```

Tasty has a very limited free account, so you may run out of requests quite quickly, use the [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard) to monitor your usage.

## State

Imagine you are working on an application that can be in two states: `Idle` and `Activated`. You can represent such application with a finite state machine:

```mermaid
stateDiagram-v2

state State {
  direction LR
  [*] --> Idle
  Idle --> Activated: activate
  Activated --> Idle: deactivate
}
```

Using the state machine as a guide, you can provide an implementation for your application's state by providing:

1. a type definition for the state
1. a set of transitions that transform the state
1. a hook that allows React components to consume the state

Begin by defining a type that allows you to represent your state, including all the possible sub-states:

```typescript
type State = "Idle" | "Activated";
```

Then, use [signals](https://react-rxjs.org/docs/api/utils/createSignal) to represent and compose the transitions between states. If you create a signal:

```typescript
const [activate$, activate] = createSignal<void>();
const [deactivate$, deactivate] = createSignal<void>();
```

`createSignal` returns tuple, with an observable on the first element and a setter function on the second element. Use the observable to compose your application's state, and export the setter as your state transitions public API. In this case, `activate` and `deactivate` become the public API that allows the user to trigger a state transition, and `activate$` and `deactivate$` the private API that allows you to compose state transitions to produce a new state of your application.

For example, this is a possible implementation of our application's state:

```typescript
const state$ = merge(
  activate$.pipe(map(() => "Activated" as const)),
  deactivate$.pipe(map(() => "Idle" as const))
).pipe(startWith("Idle"));
```

> Notice that our state transition functions do not carry a value in this case. Arguably we could implement our state
> transitions with a single signal:
>
> `const [transition$, setTransition] = createSignal<State>()`.
>
> But we want to highlight the importance of the **meaning** of each state transition. As much as possible, your public
> API should represent your "ideal" state machine without showing the implementation details.
>
> Later on we will show how sometimes it makes sense to carry data along with a state transition.

After that, you can create a hook to allow React components consume the state of your application:

```typescript
const [useAppState, appState$] = bind(state$);
```

And finally you can export your public API, which should be your state transitions plus your state hooks:

```typescript
export { activate, deactivate, useAppState, appState$ };
```

> `appState$` is the underlying StateObservable behind the `useAppState` hook. This observable is multicased and shared, an you can use it to compose your state with other observables in other parts of your application. I like to recommend only adding to your public API observables that represents state in your application, and carry meaning in your busines, rather than using the observable returned by signals. This is because signals are implementation details for a concrete state machine, and you may want to change them in the future, while the state should be a stable concept in your business.

### Example 1, simple state: managing favorites

```mermaid
stateDiagram-v2
direction LR

[*] --> FavoritesSelection
FavoritesSelection --> FavoritesSelection: addFavorite(recipeId)
FavoritesSelection --> FavoritesSelection: removeFavorite(favoriteId)
FavoritesSelection --> FavoritesSelection: bulkRemoveFavorites(favoriteId[])
FavoritesSelection --> FavoritesSelection: selectAllFavorites
FavoritesSelection --> FavoritesSelection: clearFavoritesSelection
```

### Example 2, state with sub states: listing and searching recipes

```mermaid
stateDiagram-v2

state RecipesRequest {
  [*] --> ListRecipes
  ListRecipes --> ListRecipes: nextPage
  ListRecipes --> ListRecipes: previousPage
  ListRecipes --> SearchRecipes: searchRecipes(query)
  SearchRecipes --> SearchRecipes: nextPage
  SearchRecipes --> SearchRecipes: previousPage
  SearchRecipes --> ListRecipes: clearSearch
}
```

That intermediate state represents the arguments for a service call. By composing `RecipeListRequest` with an observable service, we produce [`PaginatedRecipeListResult`](src/recipes/model.ts), which is the final state we want to offer as a public API of our application.

# Remove all this section!

Is worth noting this composition has side effects (errors and network calls), but the result is exposed in the same resulting observable state. This is usually the case with read operations, but more often than not **is not the case with mutations**. As seen before, mutation usually have the common side effects (errors, network calls, asynchronicity), but on top of that their result may affect the emissions of other pieces of observable state.

For example, triggering the `addFavorite` transition in [`favorites/state.manage.ts`](src/favorites/state.manage.ts) emits the result of the mutation (`Result<string | string[]>`), which represents the IDs of the successfully manipulated `Favorite` objects. But additionally, it produces an emission of `Favorite[]` for all components using the `useFavorites` hook from the same file (errors are implicit and not shown).

```mermaid
stateDiagram-v2
direction LR

state MutationResult {
  [*] --> Idle
  Idle --> Awaiting: addFavorite
  Idle --> Awaiting: removeFavorite
  Idle --> Awaiting: bulkRemoveFavorites
  Awaiting --> Success: side effect (network response)
  Success --> Idle: resetFavoritesResult
}

state FavoritesList {
  state "Favorite[]" as F
  [*] --> F: side effect (network response)
  F --> F: side effect (network response)
}

MutationResult --> FavoritesList: side effect (invalidate)


```

## Todo

- [ ] Error handling.
- [ ] Representing mutations with [MutationResult](src/lib/mutation.ts) probably needs more work.
- [ ] Unit tests?
- [ ] Integration tests?
