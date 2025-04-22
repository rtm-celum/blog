---
layout: post
title: "tsconfig - strict:false gotcha"
date: 2025-04-15
categories: [ typescript,tsconfig,strict ]
---

We're using "strict": false for our projects 

```json
"compilerOptions": {
"target": "ES2015",
"module": "ESNext",
"strict": false
}
```

```typescript
type Engine = 'combustion' | 'electric';

type Car = {
  name: string;
  engine: Engine;
  manyMoreConfigOptions: string;
}

const nextDreamCar1: Car = {
  name: 'Renault Scenic E-Tech',
  engine: 'electric',
  manyMoreConfigOptions: 'polar white, 210 PS, 4WD, 0-100 in 3.5s, 0 emissions'
}

const nextDreamCar2: Car = {
  name: 'Ford Ranger',
  engine: 'combustion',
  manyMoreConfigOptions: 'dark, 550 PS, 4WD, 0-100 in 3.5s, 20 litres/100km'
}

const boughtCar: Car = {
  engine: 'electrical power stream',
  ...nextDreamCar2,
}

superCharger.charge(boughtCar, 100);

```
