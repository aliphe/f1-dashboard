# Migration `20201124071746-remove-raceresult-id`

This migration has been generated by Matthias Alif at 11/24/2020, 8:17:46 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "RaceResult" DROP CONSTRAINT "RaceResult_pkey",
DROP COLUMN "id"

CREATE UNIQUE INDEX "RaceResult.position_raceId_unique" ON "RaceResult"("position", "raceId")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201122182616-add-raceresults..20201124071746-remove-raceresult-id
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -70,9 +70,8 @@
   @@unique([round, seasonYear])
 }
 model RaceResult {
-  id       Int    @id @default(autoincrement())
   points   Int
   position Int
   grid     Int
   laps     Int
@@ -89,8 +88,10 @@
   raceId Int
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
+
+  @@unique([position, raceId])
 }
 model DriverStanding {
   position Int @id
```