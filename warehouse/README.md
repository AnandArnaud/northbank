# Warehouse

Product events from the app are posted to `/api/events`, spooled to `data/events.jsonl`, and loaded every night into Snowflake (`PRODUCT.ANALYTICS.EVENTS`) by `node warehouse/load.mjs`. `schema.sql` holds the tables and the `DAILY_ACTIVE_USERS` view the ops dashboard reads. The data team joins `EVENTS` with billing data in the same account.
