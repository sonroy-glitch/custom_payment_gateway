/*
  Warnings:

  - You are about to drop the column `provider` on the `Wallet` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `Wallet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passcode` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "provider",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "passcode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_number_key" ON "Wallet"("number");
