import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { LuClipboardEdit } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import WorkModal from "./WorkModal";

const Works = ({ works }) => {
  const router = useRouter();
  const removeWork = async (id) => {
    const confirm = window.confirm(
      `Are you sure you want to delete work item?`
    );

    if (confirm) {
      const res = await fetch(`http://localhost:3000/api/works?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
        alert("Successfully work item deleted!");
      }
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 gap-y-8 md:gap-y-10">
      {works.map((item) => (
        <div key={item.id} className="group">
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
                <button
                  onClick={() =>
                    document.getElementById("workModal").showModal()
                  }
                >
                  <LuClipboardEdit />
                </button>
                <button className="" onClick={() => removeWork(item._id)}>
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
            <p className="text-[16px] md:text-[20px] mt-3">
              {item?.detailsTitle}
            </p>
          </div>
        </div>
      ))}
      <WorkModal />
    </div>
  );
};

export default Works;
