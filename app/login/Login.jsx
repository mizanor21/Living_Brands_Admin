import Link from "next/link";

const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="shadow-2xl rounded-xl p-10">
        <h1 className="text-2xl text-center pb-10">Admin Panel</h1>
        <div className="">
          <form>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Email <span className="text-red-700">*</span>
                </span>
              </label>
              <input type="email" className="input input-bordered w-full" />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">
                  Password <span className="text-red-700">*</span>
                </span>
              </label>
              <input type="password" className="input input-bordered w-full" />
            </div>
            <Link
              href={"/dashboard"}
              className="btn bg-[#125b5c] hover:bg-[#0f4849] text-white w-full my-3"
            >
              {" "}
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
