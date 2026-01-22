/*
  Warnings:

  - You are about to drop the column `email` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Wallet` table. All the data in the column will be lost.
  - You are about to drop the column `passcode` on the `Wallet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Wallet_number_key";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "number",
DROP COLUMN "passcode";
