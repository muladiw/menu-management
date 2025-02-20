-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "id_parent" TEXT,
    "depth" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menu_name_key" ON "menu"("name");

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_id_parent_fkey" FOREIGN KEY ("id_parent") REFERENCES "menu"("id") ON DELETE SET NULL ON UPDATE CASCADE;
