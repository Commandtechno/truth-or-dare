const tod = require(".");

(async () => {
  console.log("testing truth");
  const truth = await tod.truth();
  if (truth.type !== "TRUTH") console.log("ERROR: truth.type !== TRUTH");

  console.log("testing dare");
  const dare = await tod.dare();
  if (dare.type !== "DARE") console.log("ERROR: dare.type !== DARE");

  console.log("testing would you rather");
  const wyr = await tod.wyr();
  if (wyr.type !== "WYR") console.log("ERROR: wyr.type !== WYR");

  console.log("testing never have I ever");
  const nhie = await tod.nhie();
  if (nhie.type !== "NHIE") console.log("ERROR: nhie.type !== NHIE");

  console.log("testing paranoia");
  const paranoia = await tod.paranoia();
  if (paranoia.type !== "PARANOIA") console.log("ERROR: paranoia.type !== PARANOIA");

  console.log("testing R rating");
  tod.enable("R");
  const truth2 = await tod.truth();
  if (truth2.type !== "TRUTH") console.log("ERROR: truth2.type !== TRUTH");
  if (truth2.rating !== "R") console.log("ERROR: truth2.rating !== 'R'");

  console.log("testing PG rating");
  tod.disable("R");
  tod.enable("PG");
  const dare2 = await tod.truth();
  if (dare2.type !== "TRUTH") console.log("ERROR: dare2.type !== TRUTH");
  if (dare2.rating !== "PG") console.log("ERROR: dare2.rating !== 'PG'");

  console.log("testing PG13 + R rating");
  tod.disable("PG");
  tod.enable("PG13");
  tod.enable("R");
  const wyr2 = await tod.wyr();
  if (wyr2.type !== "WYR") console.log("ERROR: wyr2.type !== WYR");
  if (wyr2.rating !== "PG13" && wyr2.rating !== "R")
    console.log("ERROR: wyr2.rating !== 'PG13' | 'R'");

  console.log("testing PG13 rating");
  tod.disable("R");
  const nhie2 = await tod.nhie();
  if (nhie2.type !== "NHIE") console.log("ERROR: nhie2.type !== NHIE");
  if (nhie2.rating !== "PG13") console.log("ERROR: nhie2.rating !== 'PG13'");

  console.log("Done");
})();