"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable, { UserOptions } from "jspdf-autotable";

// @ts-ignore
import vazirFont from '@/fonts/vazir-normal';

import { useCartStore } from '@/features/cart/useCartStore';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState<"form" | "payment" | "receipt">("form");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handleFakePayment = () => {
    setStep("receipt");
    clearCart();
  };

  const generateInvoicePdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.addFileToVFS("Vazir-Medium.ttf", vazirFont);
    doc.addFont("Vazir-Medium.ttf", "Vazir", "normal");
    doc.setFont("Vazir");
    doc.setFontSize(12);

    doc.text("Purchase receipt", 105, 20, { align: "center" });
    doc.text(`Name: ${formData.fullName}`, 20, 40);
    doc.text(`Email: ${formData.email}`, 20, 50);
    doc.text(`Address: ${formData.address}`, 20, 60);

    let finalY = 80;
    autoTable(doc, {
      startY: finalY,
      head: [["Product", "Count", "Price (Toman)"]],
      body: items.map((item) => [
        item.title,
        item.quantity.toString(),
        (item.quantity * item.price).toLocaleString(),
      ]),
      didDrawPage: (data: any) => {
        finalY = data.cursor.y;
      },
    } as UserOptions);

    doc.text(`total sum: ${totalPrice().toLocaleString()} Toman`, 20, finalY + 10);
    doc.save("receipt.pdf");
  };

  if (items.length === 0 && step !== "receipt") {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Your shopping cart is empty.</h2>
      </div>
    );
  }

  if (step === "receipt") {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 The order was placed!</h2>
        <p className="mb-2">Thanks dear {formData.fullName}</p>
        <p className="mb-2">The order receipt was sent to {formData.email} email.</p>
        <p className="mb-6">Products will be shipped soon to the following address:</p>
        <p className="font-medium">{formData.address}</p>

        {/*<button*/}
        {/*  onClick={generateInvoicePdf}*/}
        {/*  className="mt-4 bg-gray-800 text-white px-6 py-2 rounded"*/}
        {/*>*/}
        {/*  Download PDF Factor🧾*/}
        {/*</button>*/}

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
        >
          Return to the main page
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {step === "form" ? "🔐 Shipping information" : "💳 Online payment (simulated)"}
      </h1>

      {step === "form" && (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 w-full rounded"
          >
            Continue to the payment stage
          </button>
        </form>
      )}

      {step === "payment" && (
        <div className="text-center">
          <p className="mb-4 text-lg">Payable amount:{totalPrice().toLocaleString()} Toman</p>
          <button
            onClick={handleFakePayment}
            className="bg-blue-600 text-white py-2 px-6 rounded"
          >
            Payment and order registration
          </button>
        </div>
      )}
    </div>
  );
}
