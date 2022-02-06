// libraries

import { AsyncQueue } from "@sapphire/async-queue";
import robert from "robert";

// types

export type Rating = "PG" | "PG13" | "R";
export type Type = "TRUTH" | "DARE" | "WYR" | "NHIE" | "PARANOIA";
export interface Response {
  id: string;
  type: Type;
  rating: Rating;
  question: string;
}

// constants

const queue = new AsyncQueue();
const client = robert.client("https://api.truthordarebot.xyz/v1");

const pending = new Set<Promise<unknown>>();
const defaultRatings = new Set<Rating>();

// utility

async function request(path: string, ratings: Rating | Iterable<Rating>): Promise<Response> {
  await queue.wait();
  if (pending.size >= 5) {
    await Promise.all(pending);
    pending.clear();
  }

  const req = client.get(path);
  if (typeof ratings === "string") req.query("rating", ratings);
  else for (const rating of ratings) req.query("rating", rating);

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

// default ratings

export function enable(ratings?: Rating | Iterable<Rating>) {
  if (typeof ratings === "string") defaultRatings.add(ratings);
  else for (const rating of ratings) defaultRatings.add(rating);
}

export function disable(ratings?: Rating | Iterable<Rating>) {
  if (typeof ratings === "string") defaultRatings.delete(ratings);
  else for (const rating of ratings) defaultRatings.add(rating);
}

// api routes

export function truth(ratings: Rating | Iterable<Rating> = defaultRatings) {
  return request("/truth", ratings);
}

export function dare(ratings: Rating | Iterable<Rating> = defaultRatings) {
  return request("/dare", ratings);
}

export function wyr(ratings: Rating | Iterable<Rating> = defaultRatings) {
  return request("/wyr", ratings);
}

export function nhie(ratings: Rating | Iterable<Rating> = defaultRatings) {
  return request("/nhie", ratings);
}

export function paranoia(ratings: Rating | Iterable<Rating> = defaultRatings) {
  return request("/paranoia", ratings);
}