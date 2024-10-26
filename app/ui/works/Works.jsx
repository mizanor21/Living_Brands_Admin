import Image from "next/image";
import Link from "next/link";
import React from "react";

const Works = ({ works }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-8 md:gap-y-20">
      {works.map((item) => (
        <Link key={item.id} href={`/work/${item?._id}`}>
          <div>
            <Image
              src={item?.img}
              alt=""
              width={500}
              height={100}
              className="rounded-xl"
            />
            <h2 className="text-md lg:text-lg font-extrabold mt-3">
              {item?.title}
            </h2>
            <p className="text-[16px] md:text-[20px] mt-3">
              {item?.detailsTitle}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Works;
