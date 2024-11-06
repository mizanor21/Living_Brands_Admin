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
    <div>
      <ToastContainer />

      <HeroSection data={heroSection} />
      <DefinesSection data={defineUsSection} />
      <ElevateSection data={elevateSection} />
    </div>
  );
};

export default Home;
