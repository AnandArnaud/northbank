// Nightly load of data/events.jsonl into PRODUCT.ANALYTICS.EVENTS. Run by cron on the app host:
//   node warehouse/load.mjs
// Credentials come from the environment (see .env.example).
import { readFile, rename } from "node:fs/promises";
import snowflake from "snowflake-sdk";

const spool = "data/events.jsonl";
const text = await readFile(spool, "utf8").catch(() => "");
const rows = text.split("\n").filter(Boolean).map((l) => JSON.parse(l));
if (rows.length === 0) {
  console.log("nothing to load");
  process.exit(0);
}

const conn = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USER,
  password: process.env.SNOWFLAKE_PASSWORD,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE ?? "COMPUTE_WH",
  database: "PRODUCT",
  schema: "ANALYTICS",
});

await new Promise((res, rej) => conn.connect((err) => (err ? rej(err) : res())));
const sql = "INSERT INTO EVENTS (EVENT_NAME, USER_ID, ANONYMOUS_ID, PROPERTIES, EVENT_TIME) SELECT ?, ?, ?, PARSE_JSON(?), ?";
for (const r of rows) {
  await new Promise((res, rej) =>
    conn.execute({ sqlText: sql, binds: [r.event_name, r.user_id, r.anonymous_id, JSON.stringify(r.properties), r.event_time], complete: (err) => (err ? rej(err) : res()) }),
  );
}
await rename(spool, `${spool}.${Date.now()}.loaded`);
console.log(`loaded ${rows.length} events`);
conn.destroy(() => {});
