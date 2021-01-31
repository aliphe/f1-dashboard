# Migration `20201122182616-add-raceresults`

This migration has been generated by Matthias Alif at 11/22/2020, 7:26:16 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "RaceResult" (
"id" SERIAL,
    "points" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "grid" INTEGER NOT NULL,
    "laps" INTEGER NOT NULL,
    "time" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
)

ALTER TABLE "RaceResult" ADD FOREIGN KEY("driverId")REFERENCES "Driver"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "RaceResult" ADD FOREIGN KEY("teamId")REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "RaceResult" ADD FOREIGN KEY("raceId")REFERENCES "Race"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201122165746-add-name-race..20201122182616-add-raceresults
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
@@ -23,8 +23,9 @@
   createdAt      DateTime         @default(now())
   updatedAt      DateTime         @updatedAt
   DriverStanding DriverStanding[]
+  RaceResult     RaceResult[]
 }
 model Team {
   id           String         @id
@@ -33,10 +34,11 @@
   url          String
   seasons      Season[]
   TeamStanding TeamStanding[]
-  createdAt DateTime @default(now())
-  updatedAt DateTime @updatedAt
+  createdAt  DateTime     @default(now())
+  updatedAt  DateTime     @updatedAt
+  RaceResult RaceResult[]
 }
 model Circuit {
   id      String @id
@@ -50,24 +52,47 @@
   Race      Race[]
 }
 model Race {
-  id         Int      @id @default(autoincrement())
+  id         Int          @id @default(autoincrement())
   round      Int
   seasonYear Int
   name       String
-  season     Season   @relation(fields: [seasonYear], references: [year])
+  season     Season       @relation(fields: [seasonYear], references: [year])
   circuitId  String
-  circuit    Circuit  @relation(fields: [circuitId], references: [id])
+  circuit    Circuit      @relation(fields: [circuitId], references: [id])
   date       DateTime
   url        String
+  RaceResult RaceResult[]
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   @@unique([round, seasonYear])
 }
+model RaceResult {
+  id       Int    @id @default(autoincrement())
+  points   Int
+  position Int
+  grid     Int
+  laps     Int
+  time     String
+  status   String
+
+  driver   Driver @relation(fields: [driverId], references: [id])
+  driverId String
+
+  team   Team   @relation(fields: [teamId], references: [id])
+  teamId String
+
+  race   Race @relation(fields: [raceId], references: [id])
+  raceId Int
+
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
+}
+
 model DriverStanding {
   position Int @id
   points   Int
   wins     Int
```