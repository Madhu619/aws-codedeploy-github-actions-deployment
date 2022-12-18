import React from 'react';
import logo from '../../utils/icons/logo.jpeg'
import axios from 'axios';
import { CardsList } from "../../utils/types";

interface iPayments {
  product: CardsList,
  userId: string
}

const Payments: React.FC<iPayments> = ({
  product,
  userId
}) =>  {
  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
          resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function displayRazorpay() {
    const res = await initializeRazorpay()
    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
    const { id, price, description, name, discount } = product;
    const finalAmount = discount ? price - ( price / ( 100 / discount)) : price;
    // creating a new order
    const result = await axios.post("http://localhost:8000/create/orderId", {
      amount: finalAmount * 100,
      id: userId
    } );

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: process.env.RAZORPAY_KEY_LIVE, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      name: "Divine Collections",
      currency: currency,
      productId: id,
      productDescription: description,
      description: "Payment for "+ name,
      order_id: order_id,
      prefill: {
        name: "Divine Collections",
        email: "sales@divinecollections.in",
        contact: "9591734665",
      },
      image: logo,
      notes: {
          address: "Divine Collections, Corporate Office, Bengaluru",
      },
      theme: {
        color: "#3399cc"
      },
      config: {
        display: {
          blocks: {
            banks: {
              name: 'Quick and safe method',
              instruments: [
                {
                  method: 'card',
                },
                {
                  method: 'upi'
                },
                ],
            },
          },
          sequence: ['block.banks'],
          preferences: {
            show_default_blocks: true,
          },
        },
      },
      handler: async function (response: any) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("http://localhost:8000/payment/success", data);

          window.confirm(result.data.message);
      },
      modal: {
        ondismiss: function () {
          if (window.confirm("Are you sure, you want to close the form?")) {
            console.log("Checkout form closed by the user");
          } else {
            console.log("Complete the Payment")
          }
        }
      }
    };

    const paymentObject =  new (window as any).Razorpay(options);
    paymentObject.open();
  }
  return (
    <div>
      <main className="font-Inter h-screen overflow-auto bg-gradient-to-tr from-[#252B30] to-[#191C22]">
      <div className="relative z-10 flex flex-col md:flex-row mt-10 items-center  max-w-6xl justify-evenly mx-auto">
        <div className="md:w-1/3 mb-20 md:mb-0 mx-10">
          <div className="bg-gradient-to-r from-[#3e4044] to-[#1D2328] p-[1px] rounded-md mb-4">
            <button className="App-link btn btn-success" onClick={displayRazorpay}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
}

export default Payments;