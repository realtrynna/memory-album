/*
  Warnings:

  - You are about to drop the column `createdAt` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `albums` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `images` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `originalName` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `saveName` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `videos` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `albums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_name` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_name` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `save_name` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."albums" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."images" DROP COLUMN "createdAt",
DROP COLUMN "originalName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "original_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "createdAt",
DROP COLUMN "isDeleted",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."videos" DROP COLUMN "createdAt",
DROP COLUMN "originalName",
DROP COLUMN "saveName",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "original_name" TEXT NOT NULL,
ADD COLUMN     "save_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
