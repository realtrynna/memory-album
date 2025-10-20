/*
  Warnings:

  - You are about to drop the column `original_name` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `original_name` on the `videos` table. All the data in the column will be lost.
  - Added the required column `filename` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `filename` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."images" DROP COLUMN "original_name",
ADD COLUMN     "filename" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."videos" DROP COLUMN "original_name",
ADD COLUMN     "filename" TEXT NOT NULL;
