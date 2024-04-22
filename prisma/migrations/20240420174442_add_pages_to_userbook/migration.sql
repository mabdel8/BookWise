/*
  Warnings:

  - Added the required column `pagesRead` to the `UserBook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPages` to the `UserBook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserBook" ADD COLUMN     "pagesRead" INTEGER NOT NULL,
ADD COLUMN     "totalPages" INTEGER NOT NULL;
