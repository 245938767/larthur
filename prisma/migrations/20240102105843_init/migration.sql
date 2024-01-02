-- CreateTable
CREATE TABLE "BlockContent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "readingTime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "mainImage" BLOB NOT NULL,
    "body" BLOB NOT NULL
);

-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BlockContentToCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_BlockContentToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "BlockContent" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BlockContentToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Category" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "BlockContent_slug_key" ON "BlockContent"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_BlockContentToCategory_AB_unique" ON "_BlockContentToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BlockContentToCategory_B_index" ON "_BlockContentToCategory"("B");
