-- DropForeignKey
ALTER TABLE "public"."images" DROP CONSTRAINT "images_albumId_fkey";

-- AlterTable
ALTER TABLE "public"."images" ALTER COLUMN "albumId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."videos" (
    "id" SERIAL NOT NULL,
    "originalName" TEXT NOT NULL,
    "saveName" TEXT NOT NULL,
    "extension" "public"."Extension" NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "thumbnail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."images" ADD CONSTRAINT "images_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "public"."albums"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."videos" ADD CONSTRAINT "videos_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
