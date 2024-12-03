/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/businessnetwork/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/companyprofile/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/companyprofile/editprofile/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/login/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/managenetwork/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/managenetwork/managenetwork/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/managenetwork/mynetwork/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/managenetwork/search/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/managenetwork/stock-details-buyer/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/managenetwork/trading/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/purchaserequest/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/purchaserequest/purchasedetails/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/quotationrequest/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/quotationrequest/openquotation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/quotationrequest/qrhold/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/quotationrequest/qrrecieved/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/quotationrequest/quotationrejected/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/quotationrequest/quotationsend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/stockdetails/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/businessnetwork/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
