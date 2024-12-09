import { useState } from "react";
import { FaSearch, FaQrcode, FaCreditCard } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import Sidebar from "@/components/ui/sidebar";
import Header from "@/components/ui/header.tsx";
const PropertyPaid = () => {
  const [selectedBank, setSelectedBank] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [errors, setErrors] = useState({});

  const productDetails = {
    name: "Premium Subscription",
    price: "$99.99",
    image:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  };

  const selectedOptions = {
    packageName: "Package 1",
    usagePeriod: "Monthly",
  };

  const banks = [
    "Vietcombank",
    "VietinBank",
    "BIDV",
    "Agribank",
    "Techcombank",
    "MBBank",
    "ACB",
    "VPBank",
    "Sacombank",
    "TPBank",
  ];

  const filteredBanks = banks.filter((bank) =>
    bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setErrors({});
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!selectedBank) {
      newErrors.bank = "Please select a bank";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Process payment
      console.log("Payment processed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            ``
            <img
              className="h-full w-full object-cover md:w-48"
              src={productDetails.image}
              alt={productDetails.name}
            />
          </div>
          <div className="p-8 w-full">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Product Details
            </div>
            <h1
              className="mt-2 text-3xl font-bold text-gray-900"
              aria-label="Product name"
            >
              {productDetails.name}
            </h1>
            <p
              className="mt-2 text-xl text-gray-600"
              aria-label="Product price"
            >
              {productDetails.price}
            </p>
            <div className="mt-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Selected Options
              </h2>
              <p className="mt-1 text-gray-600">
                Package: {selectedOptions.packageName}
              </p>
              <p className="text-gray-600">
                Period: {selectedOptions.usagePeriod}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Payment Methods
          </h2>
          <div className="mb-4 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search banks..."
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search banks"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {filteredBanks.map((bank) => (
              <button
                key={bank}
                className={`p-4 border rounded-md text-center transition-all duration-200 ${
                  selectedBank === bank
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleBankSelect(bank)}
                aria-label={`Select ${bank}`}
              >
                {bank}
              </button>
            ))}
          </div>
          {selectedBank && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Payment Options for {selectedBank}
              </h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-md hover:bg-gray-50 transition-all duration-200">
                  <h4 className="font-semibold flex items-center">
                    <FaCreditCard className="mr-2" /> Manual Bank Transfer
                  </h4>
                  <p className="mt-2 text-gray-600">
                    Account Number: 1234567890
                    <br />
                    Account Name: Premium Services
                    <br />
                    Bank: {selectedBank}
                  </p>
                </div>
                <div className="p-4 border rounded-md hover:bg-gray-50 transition-all duration-200">
                  <h4 className="font-semibold flex items-center">
                    <FaQrcode className="mr-2" /> QR Code Payment
                  </h4>
                  <button
                    className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-all duration-200"
                    onClick={() => setShowQRCode(!showQRCode)}
                  >
                    {showQRCode ? "Hide" : "Show"} QR Code
                  </button>
                  {showQRCode && (
                    <div className="mt-4">
                      <img
                        src="https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                        alt="QR Code for payment"
                        className="w-48 h-48 mx-auto"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {errors.bank && (
            <div className="text-red-500 flex items-center mb-4">
              <RiErrorWarningLine className="mr-2" />
              {errors.bank}
            </div>
          )}
          <button
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handlePaymentSubmit}
            aria-label="Process Payment"
          >
            Process Payment
          </button>
        </div>
      </div>
    </div>
  );
};

const PaidPage = () => {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div
            className="flex rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mx-auto py-3"></div>
          </div>

          <div className="flex flex-col sm:flex-row">
            <div className="flex-1">
              <div className="font-[sans-serif] w-full">
                {/* Your new div tag */}
                <div className="w-full flex justify-center items-center">
                  {/* Content for the new div */}
                  <PropertyPaid />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaidPage;
