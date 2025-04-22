---
layout: post
title: "Typescript - Passing Params as Options"
date: 2025-04-15
categories: [ typescript,functions,beginner ]
---

### Flexible Function Parameters with TypeScript

When working with functions that require multiple parameters, some of which are optional or have default values, things can quickly get messy. A great way to
keep things clean and flexible is by using an options object to consolidate parameters. This approach boosts readability and future-proofs your code.

### Scenario: Generating Unique Random Identifiers

Consider a scenario where you need a function to generate unique random identifiers (e.g., for Portal pages or widget IDs). The function needs to be
configurable, allowing you to:

- Avoid generating certain IDs (to prevent duplicates)
- Set the length of the generated ID
- Specify how many IDs to generate

Here’s how we originally tackled the problem:

```typescript
export function getUniqueId(existingIds?: Set<string>, length = 4): string {
  let newString = generateRandomCharacterString(length);
  while (existingIds?.has(newString)) {
    newString = generateRandomCharacterString(length);
  }
  return newString;
}
```

While this works, passing parameters felt awkward. For example, if you wanted to specify a custom length for the ID, you’d also have to pass an empty set for
the `existingIds` parameter. This made function calls unnecessarily complex.

### Introducing the `UniqueGenerationOptions` Type

To address this, we introduced an options object: `UniqueGenerationOptions`. This object consolidates all the configuration into one parameter, making the
function easier to call and extending its flexibility.

```typescript
export type UniqueGenerationOptions = {
  /** Specify ids which should be avoided to ensure uniqueness also with a short id length - defaults to empty set */
  avoidIds?: Set<string>;
  /** Specify the length of the generated id - defaults to 4 */
  length?: number;
};
```

This allows us to pass in a single options object instead of multiple parameters.

### Refined Implementation

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

Now, calling the function feels much more intuitive. Here are some examples:

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

Using an options object like this is a simple but powerful design pattern. It makes your functions more readable and flexible, and it allows you to add new
configuration options in the future without breaking existing functionality. This pattern is used across our codebase, especially in scenarios where functions
have multiple optional parameters. It’s scalable, and the calling code remains clean and intuitive.
