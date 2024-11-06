// HeroSection.js
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefinesSection from "./Defines";
import ElevateSection from "./ElevateSction";
import HeroSection from "./HeroSection";

const Home = () => {
  const [heros, setHeros] = useState([]);

  useEffect(() => {
    const fetchHerosData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/home`
        );
        setHeros(data || []);
      } catch (error) {
        setFetchError("Failed to load hero data. Please try again later.");
      }
    };
    fetchHerosData();
  }, []);

  const {
    heroSection = {},
    videoSection = {},
    elevateSection = {},
    defineUsSection = {},
    slideshowSection = {},
    solutionSection = {},
    journeySection = {},
    brandSection = {},
  } = heros[0] || {};

  return (
    <div className="grid gap-5">
      <ToastContainer />

      <HeroSection data={heroSection} id="672acdb3167e8afc7894cdd9" />
      <DefinesSection data={defineUsSection} id="672acdb3167e8afc7894cdd9" />
      <ElevateSection data={elevateSection} id="672acdb3167e8afc7894cdd9" />
    </div>
  );
};

export default Home;
