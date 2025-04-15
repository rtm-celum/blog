---
layout: post
title: "Typescript - Passing Params as Options"
date: 2025-04-15
categories: [ typescript,functions,beginner ]
---

### Pattern 'Flexibility for Function Params'

This design pattern show how can model function params to increase flexibility and readability. It is particularly useful when you have a function with multiple
parameters, some of which are optional or have default values.

### Scenario 'Generating unique random identifiers'

We often need a function that generates unique random identifier (e.g. for portal pages, widget ids, etc.). The function should be configurable:

- avoid certain IDs (e.g., to ensure no duplicates)
- set the length of the generated ID
- number of IDs to generate

We started with a simple function

```typescript
export function getUniqueId(existingIds?: Set<string>, length = 4): string {
  let newString = generateRandomCharacterString(length);
  while (existingIds?.has(newString)) {
    newString = generateRandomCharacterString(length);
  }
  return newString;
}
```

and passed all params to it. But sometimes the usage felt awkward. For example if you wanted to generate a unique ID with a custom length, you had to pass an
empty set for the existing IDs.

Therefore we introduced an `UniqueGenerationOptions` options object.

### The `UniqueGenerationOptions` Type

Instead of defining individual parameters for each configurable aspect, we started to use an `options` object. This object consolidates all configuration into a
single parameter, making it more scalable and readable.

```typescript
export type UniqueGenerationOptions = {
  /** Specify ids which should be avoided to ensure uniqueness also with a short id length - defaults to empty set*/
  avoidIds?: Set<string>;
  /** Specify the length of the generated id - defaults to 4 */
  length?: number;
};
```

Let's take a look at the code that implements this approach.

### Adapted implementation

```typescript
/**
 * Generates a unique random character based ID.
 *
 * @param options - options for ID generation.
 * @returns A unique random ID string.
 */
export function getUniqueId(options?: UniqueGenerationOptions): string {
  const idLength = options?.length ?? 4;
  const idsToAvoid = options?.avoidIds ?? new Set();

  let newString = generateRandomCharacterString(idLength);
  while (idsToAvoid.has(newString)) {
    newString = generateRandomCharacterString(idLength);
  }
  return newString;
}
```

You can now invoke the function in multiple ways, and none of them feels awkward anymore:

```typescript
// 1. Default usage
const id1 = getUniqueId(); // e.g. "a1b2"
// 2. Custom length
const id2 = getUniqueId({ length: 8 }); // e.g. "a1b2c3d4"
// 3. Avoid certain IDs
const id3 = getUniqueId({ avoidIds: new Set(['a1b2', 'c3d4']) }); // e.g. "e5f6"
// 4. Custom length and avoid certain IDs
const id4 = getUniqueId({ length: 8, avoidIds: new Set(['a1b2c3d4', 'e5f6g7h8']) }); // e.g. "i9j0k1l2"
```

### Summary

This pattern is a great way to increase the flexibility and readability of your functions. By using an options object, you can easily add new parameters in the
future without breaking existing code or making its usage awkward.

### Usage in our Product 

This pattern is used throughout our whole code base, but especially  
