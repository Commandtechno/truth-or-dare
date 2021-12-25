import robert from "robert";
import { AsyncQueue } from "@sapphire/async-queue";

export type Rating = "PG" | "PG13" | "R";
export type Type = "TRUTH" | "DARE" | "WYR" | "NHIE" | "PARANOIA";
export interface Response {
  id: string;
  type: Type;
  rating: Rating;
  question: string;
}

const pending = new Set();
const queue = new AsyncQueue();
const client = robert.client("https://api.truthordarebot.xyz/api");

async function request(path: string, rating?: Rating): Promise<Response> {
  await queue.wait();
  if (pending.size >= 5) {
    await Promise.all(pending);
    pending.clear();
  }

  const req = client.get(path);
  if (rating) req.query("rating", rating);

  const res = req.send("json");
  const promise = new Promise(resolve =>
    setTimeout(() => {
      pending.delete(res);
      resolve(null);
    }, 5000)
  );

  pending.add(promise);
  const data = await res;
  queue.shift();
  return data;
}

export function truth(rating?: Rating) {
  return request("/truth", rating);
}

export function dare(rating?: Rating) {
  return request("/dare", rating);
}

export function wyr(rating?: Rating) {
  return request("/wyr", rating);
}

export function nhie(rating?: Rating) {
  return request("/nhie", rating);
}

export function paranoia(rating?: Rating) {
  return request("/paranoia", rating);
}
