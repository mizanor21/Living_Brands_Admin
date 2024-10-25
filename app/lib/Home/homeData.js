import { HomeDefines, HomeElevate, HomeHero } from "./models";
import { connectToDB } from "../connectToDB";

export const heroData = async () => {
  try {
    connectToDB();
    const response = await HomeHero.find().lean();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const elevateData = async () => {
  try {
    connectToDB();
    const response = await HomeElevate.find().lean();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const definesData = async () => {
  try {
    connectToDB();
    const response = await HomeDefines.find().lean();
    return response;
  } catch (error) {
    console.error(error);
  }
};
