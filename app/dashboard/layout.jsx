import Nav from "../ui/navbar/nav";
import Sidebar from "../ui/sidebar/sidebar";

const layout = ({ children }) => {
  return (
    <div className="flex w-full">
      <div className="w-[25%] bg-black text-white p-5">
        <Sidebar />
      </div>
      <div className="w-[75%] flex flex-col gap-5 p-5 bg-white text-black">
        <Nav />
        <div className="bg-gray-200 rounded-lg min-h-screen p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
