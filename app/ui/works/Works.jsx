import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const removeWork = async (id) => {
  const confirm = window.confirm(`Are you sure you want to delete work item?`);

  if (confirm) {
    await fetch(`http://localhost:3000/api/works?id=${id}`, {
      method: "DELETE",
    });
    alert("Successfully work item deleted!");
  }
};

const Works = ({ works }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 gap-y-8 md:gap-y-10">
      {works.map((item) => (
        <Link key={item.id} href={`/work/${item?._id}`} className="group">
          <div>
            <Image
              src={item?.img}
              alt=""
              width={500}
              height={100}
              className="rounded-xl"
            />
            <div className="flex justify-between items-center">
              <h2 className="text-md lg:text-lg font-extrabold mt-3">
                {item?.title}
              </h2>
              <div className="hidden group-hover:flex gap-3">
                <button className="" onClick={() => removeWork(item._id)}>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
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
