![Truth or Dare Logo](https://truthordarebot.xyz/icon-192x192.png)

# info

the bot website: https://truthordarebot.xyz/

library for getting shit from https://docs.truthordarebot.xyz/api-docs

powered by robert™

sponsored by my last 2 braincells and coding he is coding or something idk

# epic docs

functions

```ts
// enable or disable a rating by default
function enable(rating?: Rating | Iterable<Rating>);
function disable(rating?: Rating | Iterable<Rating>);

// the api methods
function truth(rating?: Rating | Iterable<Rating>): Promise<Response>;
function dare(rating?: Rating | Iterable<Rating>): Promise<Response>;
function wyr(rating?: Rating | Iterable<Rating>): Promise<Response>;
function nhie(rating?: Rating | Iterable<Rating>): Promise<Response>;
function paranoia(rating?: Rating | Iterable<Rating>): Promise<Response>;
```

types

```ts
type Rating = "PG" | "PG13" | "R";
type Type = "TRUTH" | "DARE" | "WYR" | "NHIE" | "PARANOIA";
interface Response {
  id: string;
  type: Type;
  rating: Rating;
  question: string;
}
```
