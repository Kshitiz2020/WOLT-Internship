import React, { FormEvent, useState } from "react";
import { getDeliveryFee } from "../functions/getDeliveryFee";
import { FormData } from "../Types";
import CircularLoading from "./CircularLoading";

export default function CalculatorComp() {
  const [formData, setFormData] = useState<FormData>({
    cartValue: 0,
    distance: 0,
    numberOfItems: 0,
    dateOfOrder: "",
    timeOfOrder: "",
  });

  const [deliveryFee, setDeliveryFee] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (formData.cartValue <= 0 || formData.numberOfItems <= 0) {
      setDeliveryFee(0);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setDeliveryFee(() => {
        setIsLoading(false);
        return getDeliveryFee(formData);
      });
    }, 1500);
  };

  return (
    <div className="rounded-lg p-4 w-[min(100%,500px)] shadow-lg  text-gray-100 background-and-opacity">
      <div className="text-2xl font-semibold text-center">
        Delivery Fee Calculator
      </div>

      <div>
        <form className="px-6 py-6 space-y-4" name="form">
          <div className="space-x-2">
            <label className="inline-block w-20">Cart Value:</label>
            <input
              type="number"
              data-test-id="cartValue"
              className="bg-transparent border-b-2 border-gray-100 outline-none"
              onChange={(e) =>
                setFormData((prev: FormData) => {
                  return { ...prev, cartValue: Number(e.target.value) };
                })
              }
              required
            />
            <span>€</span>
          </div>

          <div className="space-x-2">
            <label className="inline-block w-20">Distance:</label>
            <input
              type="number"
              data-test-id="distance"
              className="bg-transparent border-b-2 border-gray-100 outline-none"
              onChange={(e) =>
                setFormData((prev: FormData) => {
                  return { ...prev, distance: Number(e.target.value) };
                })
              }
              required
            />
            <span>meters</span>
          </div>

          <div className="space-x-2">
            <label className="inline-block w-20">Number of Items:</label>
            <input
              type="number"
              data-test-id="numberOfItems"
              className="bg-transparent border-b-2 border-gray-100 outline-none"
              onChange={(e) =>
                setFormData((prev: FormData) => {
                  return { ...prev, numberOfItems: Number(e.target.value) };
                })
              }
              required
            />
          </div>

          <div className="space-x-2">
            <label className="inline-block w-20">Date & Time:</label>
            <input
              type="date"
              data-test-id="date"
              className="bg-transparent border-b-2 border-gray-100 outline-none"
              onChange={(e) => {
                setFormData((prev: FormData) => {
                  return { ...prev, dateOfOrder: e.target.value };
                });
              }}
              required
            />
            <input
              type="time"
              data-test-id="time"
              className="bg-transparent border-b-2 border-gray-100 outline-none"
              onChange={(e) => {
                setFormData((prev: FormData) => {
                  return { ...prev, timeOfOrder: e.target.value };
                });
              }}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="inline-block px-4 py-2 mt-4 rounded-md shadow-md w-52 bg-blue-950"
              onClick={handleFormSubmit}
            >
              {isLoading ? (
                <div className="mx-auto w-fit">
                  <CircularLoading />
                </div>
              ) : (
                <span>Calculate Delivery Price</span>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="px-6">
        Delivery Price:{" "}
        <span className="font-bold" data-test-id="fee">
          {deliveryFee} €
        </span>{" "}
      </div>
    </div>
  );
}
