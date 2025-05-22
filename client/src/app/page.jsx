"use client";

import Spinner from "../components/Spinner";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "sonner";

function page() {
  const [data, setData] = useState({
    url: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const options = [
    { value: "Maxine", label: "Maxine" },
    { value: "Louily", label: "Louily" },
  ];

  const downloadFile = async (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "products.csv"); // Optional, forces download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      if (!data.url || !data.website) {
        toast.warning("Please fill all the fields");
        return;
      }
      // setLoading(true);
      const req = await axios.post("https://scraper-lacl.onrender.com/api/", {
        url: data.url,
        website: data.website,
      });

      toast.success("Data Scraped Successfully");
      const fileUrl = "https://scraper-lacl.onrender.com/public/products.csv";
      downloadFile(fileUrl);
      setLoading(false);
      setData({ url: "", website: "" });
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-2xl font-bold mb-10">Welcome to Scraper</div>

      <div className="flex flex-col items-center gap-4 w-1/4">
        <div className="flex flex-col gap-2 w-full ">
          <label htmlFor="options" className="text-sm">
            Choose an Website:
          </label>
          <select
            name="options"
            id="options"
            onChange={(e) => {
              setData({ ...data, website: e.target.value });
              console.log(e.target.value);
            }}
            className="outline-none border-2 border-gray-300 rounded-md px-2 py-1"
          >
            <option value={""}>Select Website</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full ">
          <label htmlFor="url" className="text-sm">
            Enter the URL:
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, url: e.target.value });
              console.log(e.target.value);
            }}
            type="text"
            name="url"
            id="url"
            className="outline-none border-2 border-gray-300 rounded-md px-2 py-1"
            placeholder="Enter the URL"
          />
        </div>

        {loading ? (
          <div className="mt-4 flex justify-center items-center flex-col gap-2 w-28 rounded-md cursor-not-allowed text-white font-medium px-4 bg-blue-400 h-10  ">
            <Spinner />
          </div>
        ) : (
          <div
            onClick={() => handleSubmit()}
            className="mt-4 flex justify-center items-center flex-col gap-2 w-28 rounded-md cursor-pointer text-white font-medium px-4 bg-blue-500 h-10  "
          >
            Submit
            {/* <Spinner /> */}
          </div>
        )}
      </div>
    </section>
  );
}

export default page;
