-- AlterTable
ALTER TABLE "vehicle" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_rented" BOOLEAN NOT NULL DEFAULT false;
