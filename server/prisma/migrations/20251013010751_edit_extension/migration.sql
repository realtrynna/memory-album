/*
  Warnings:

  - You are about to drop the column `albumId` on the `images` table. All the data in the column will be lost.
  - You are about to drop the `_AlbumToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "public"."Extension" ADD VALUE 'mp4';
ALTER TYPE "public"."Extension" ADD VALUE 'webm';

-- DropForeignKey
ALTER TABLE "public"."_AlbumToPost" DROP CONSTRAINT "_AlbumToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_AlbumToPost" DROP CONSTRAINT "_AlbumToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."images" DROP CONSTRAINT "images_albumId_fkey";

-- DropForeignKey
ALTER TABLE "public"."images" DROP CONSTRAINT "images_postId_fkey";

-- DropIndex
DROP INDEX "public"."images_albumId_key";

-- AlterTable
ALTER TABLE "public"."images" DROP COLUMN "albumId";

-- DropTable
DROP TABLE "public"."_AlbumToPost";

-- CreateTable
CREATE TABLE "public"."post_albums" (
    "postId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,

    CONSTRAINT "post_albums_pkey" PRIMARY KEY ("postId","albumId")
);

-- AddForeignKey
ALTER TABLE "public"."post_albums" ADD CONSTRAINT "post_albums_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."post_albums" ADD CONSTRAINT "post_albums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "public"."albums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."images" ADD CONSTRAINT "images_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TABLE "public"."test"
(
    "name" varchar NOT NULL
);