/*
  Warnings:

  - You are about to alter the column `number` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "startTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "number" SET DATA TYPE INTEGER;
