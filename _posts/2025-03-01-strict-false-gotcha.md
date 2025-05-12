---
layout: post
title: "A Hidden Risk of strict: false and Object Spreads in TypeScript"
date: 2025-03-19
categories: [ typescript, tsconfig, strict, spread, type-safety, beginner ]
---

In our TypeScript projects, we've to keep `"strict": false` in our `tsconfig.json` due to legacy reasons. Our codebase dates back to around 2016, and over
the years we've accumulated a variety of dependencies — some of which aren’t compatible with strict mode.

```json
{
  "compilerOptions": {
    "target": "ES2015",
    "module": "ESNext",
    "strict": false
  }
}
```

One lesser-known downside of disabling strict mode is that it can mask subtle issues — especially when working with object spreads (`...`). Here's a simplified
example from a car configuration domain to illustrate the problem.

We define some basic types:

```typescript
type Engine = 'combustion' | 'hydrogen';

type Car = {
  name: string;
  color: 'blue' | 'red' | 'green' | 'white';
  engine: Engine;
  manyMoreConfigOptions: string;
}
```

Now let’s define two preconfigured cars:

```typescript
const preconfiguredCar1: Car = {
  name: 'Renault Scenic Hydro',
  color: 'blue',
  engine: 'hydrogen',
  manyMoreConfigOptions: 'polar white, 210 PS, 4WD, 0-100 in 3.5s, 0 emissions'
}

const preconfiguredCar2: Car = {
  color: 'red',
  name: 'Ford Ranger',
  engine: 'combustion',
  manyMoreConfigOptions: 'dark, 550 PS, 4WD, 0-100 in 3.5s, 20 litres/100km'
}
```

Next we try to build our dream car:

```typescript
const dreamCar: Car = {
  color: 'white',
  engine: 'electric',
  ...preconfiguredCar2,
}
```
At this point, we believe we’ve created an electric car. But when we try to charge it:

```typescript
superCharger.charge(boughtCar, 100);
```
💥 Boom. We've just tried to supercharge a combustion engine.

## What went wrong?

The issue lies in the order of property assignment during object spreading. The `engine: 'electric'` assignment was silently overwritten by `...preconfiguredCar2`, which sets the engine back to `'combustion'`.TypeScript simply ignores that assignment with `strict: false`.

As a result, there was no compiler warning, and we ended up with a car that didn’t match our expectations.

Interestingly, if the preconfigured car hadn’t included an `engine` property at all — or if we had assigned `engine: 'electric'` after the spread, the compiler would have caught the type error. This shows that developers can’t always rely on the intuitive mental model that explicitly typed objects will trigger type errors reliably. With `strict: false`, the reality is more nuanced: whether a type error surfaces may depend on subtle implementation details like property order or presence.
