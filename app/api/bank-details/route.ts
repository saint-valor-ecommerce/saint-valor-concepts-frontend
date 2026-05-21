import { NextResponse } from "next/server";

export async function GET() {
  const bankDetails = {
    bankName: process.env.USD_BANK_NAME || "Citibank",
    transferType: process.env.USD_TRANSFER_TYPE || "Local transfer",
    bankAddress: process.env.USD_BANK_ADDRESS || "111 Wall Street New York, NY 10043 USA",
    routingABA: process.env.USD_ROUTING_ABA || "031100209",
    swiftCode: process.env.USD_SWIFT_CODE || "CITIUS33",
    accountNumber: process.env.USD_ACCOUNT_NUMBER || "70580450002373046",
    accountType: process.env.USD_ACCOUNT_TYPE || "CHECKING",
    beneficiaryName: process.env.USD_BENEFICIARY_NAME || "Saint Valor Concepts",
  };

  return NextResponse.json({ success: true, data: bankDetails });
}
