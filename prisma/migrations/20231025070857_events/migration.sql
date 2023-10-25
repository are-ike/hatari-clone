-- CreateTable
CREATE TABLE "Event" (
    "transaction_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "gateway" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "transaction_type" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "card_type" TEXT NOT NULL,
    "last_4_digits" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("transaction_id")
);
