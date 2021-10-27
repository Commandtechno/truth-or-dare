![pog image](https://cdn.discordapp.com/attachments/825265084270903306/902745084913655828/38b410ffb57c254436958b39a9c6440f.png)

# info

the bot website: https://truthordarebot.xyz/

library for getting shit from https://docs.truthordarebot.xyz/api-docs

powered by robert™

sponsored by my last 2 braincells and coding he is coding or something idk

# epic docs

functions

```ts
function truth(rating?: Rating): Promise<Response>;
function dare(rating?: Rating): Promise<Response>;
function wyr(rating?: Rating): Promise<Response>;
function nhie(rating?: Rating): Promise<Response>;
function paranoia(rating?: Rating): Promise<Response>;
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