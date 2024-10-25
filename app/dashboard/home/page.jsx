const Home = async () => {
  return (
    <div className="grid gap-5">
      <h1>this is home!</h1>
    </div>
  );
};

export default Home;

// {
//   /* Elevate Section  */
// }
// <div className="relative rounded-lg bg-white p-[2%]">
//   <div className="flex items-center justify-between mb-5">
//     <h3 className="font-bold uppercase ">Elevate Section</h3>
//     <div className="flex gap-1">
//       <button className="text-xl">
//         <IoIosAddCircle />
//       </button>
//       <button className="text-xl">
//         <LiaEditSolid />
//       </button>
//       <button className="text-xl">
//         <RiDeleteBin6Fill />
//       </button>
//     </div>
//   </div>
//   <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-5 ">
//     <div>
//       <label htmlFor="">
//         Title <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("firstName", { required: true })}
//         placeholder="Title"
//         aria-invalid={errors.firstName ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.firstName && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Title is required
//           </small>
//         )}
//       </div>
//     </div>

//     <div>
//       <label htmlFor="">
//         E-mail <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("mail", { required: "Email Address is required" })}
//         placeholder="Email"
//         aria-invalid={errors.mail ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.mail && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Email address is required
//           </small>
//         )}
//       </div>
//     </div>

//     <Button className="px-10 bg-[#147274] hover:bg-[#145e60]">
//       <input type="submit" value="Save" className="cursor-pointer" />
//     </Button>
//   </form>
//   <BorderBeam size={250} duration={14} delay={10} />
// </div>;

// {
//   /* Defines Section  */
// }
// <div className="relative rounded-lg bg-white p-[2%]">
//   <div className="flex items-center justify-between mb-5">
//     <h3 className="font-bold uppercase ">Defines Section</h3>
//     <div className="flex gap-1">
//       <button className="text-xl">
//         <IoIosAddCircle />
//       </button>
//       <button className="text-xl">
//         <LiaEditSolid />
//       </button>
//       <button className="text-xl">
//         <RiDeleteBin6Fill />
//       </button>
//     </div>
//   </div>
//   <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-5 ">
//     <div>
//       <label htmlFor="">
//         Title <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("firstName", { required: true })}
//         placeholder="Title"
//         aria-invalid={errors.firstName ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.firstName && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Title is required
//           </small>
//         )}
//       </div>
//     </div>

//     <div>
//       <label htmlFor="">
//         E-mail <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("mail", { required: "Email Address is required" })}
//         placeholder="Email"
//         aria-invalid={errors.mail ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.mail && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Email address is required
//           </small>
//         )}
//       </div>
//     </div>

//     <Button className="px-10 bg-[#147274] hover:bg-[#145e60]">
//       <input type="submit" value="Save" className="cursor-pointer" />
//     </Button>
//   </form>
//   <BorderBeam size={250} duration={12} delay={9} />
// </div>;

// {
//   /* Slideshow Section  */
// }
// <div className="relative rounded-lg bg-white p-[2%]">
//   <div className="flex items-center justify-between mb-5">
//     <h3 className="font-bold uppercase ">Slideshow Section</h3>
//     <div className="flex gap-1">
//       <button className="text-xl">
//         <IoIosAddCircle />
//       </button>
//       <button className="text-xl">
//         <LiaEditSolid />
//       </button>
//       <button className="text-xl">
//         <RiDeleteBin6Fill />
//       </button>
//     </div>
//   </div>
//   <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-5 ">
//     <div>
//       <label htmlFor="">
//         Title <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("firstName", { required: true })}
//         placeholder="Title"
//         aria-invalid={errors.firstName ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.firstName && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Title is required
//           </small>
//         )}
//       </div>
//     </div>

//     <div>
//       <label htmlFor="">
//         E-mail <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("mail", { required: "Email Address is required" })}
//         placeholder="Email"
//         aria-invalid={errors.mail ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.mail && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Email address is required
//           </small>
//         )}
//       </div>
//     </div>

//     <Button className="px-10 bg-[#147274] hover:bg-[#145e60]">
//       <input type="submit" value="Save" className="cursor-pointer" />
//     </Button>
//   </form>
//   <BorderBeam size={250} duration={18} delay={9} />
// </div>;

// {
//   /* Solution Section  */
// }
// <div className="relative rounded-lg bg-white p-[2%]">
//   <div className="flex items-center justify-between mb-5">
//     <h3 className="font-bold uppercase ">Solution Section</h3>
//     <div className="flex gap-1">
//       <button className="text-xl">
//         <IoIosAddCircle />
//       </button>
//       <button className="text-xl">
//         <LiaEditSolid />
//       </button>
//       <button className="text-xl">
//         <RiDeleteBin6Fill />
//       </button>
//     </div>
//   </div>
//   <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-5 ">
//     <div>
//       <label htmlFor="">
//         Title <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("firstName", { required: true })}
//         placeholder="Title"
//         aria-invalid={errors.firstName ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.firstName && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Title is required
//           </small>
//         )}
//       </div>
//     </div>

//     <div>
//       <label htmlFor="">
//         E-mail <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("mail", { required: "Email Address is required" })}
//         placeholder="Email"
//         aria-invalid={errors.mail ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.mail && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Email address is required
//           </small>
//         )}
//       </div>
//     </div>

//     <Button className="px-10 bg-[#147274] hover:bg-[#145e60]">
//       <input type="submit" value="Save" className="cursor-pointer" />
//     </Button>
//   </form>
//   <BorderBeam size={250} duration={12} delay={9} />
// </div>;

// {
//   /* Journey Section  */
// }
// <div className="relative rounded-lg bg-white p-[2%]">
//   <div className="flex items-center justify-between mb-5">
//     <h3 className="font-bold uppercase ">Journey Section</h3>
//     <div className="flex gap-1">
//       <button className="text-xl">
//         <IoIosAddCircle />
//       </button>
//       <button className="text-xl">
//         <LiaEditSolid />
//       </button>
//       <button className="text-xl">
//         <RiDeleteBin6Fill />
//       </button>
//     </div>
//   </div>
//   <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-5 ">
//     <div>
//       <label htmlFor="">
//         Title <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("firstName", { required: true })}
//         placeholder="Title"
//         aria-invalid={errors.firstName ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.firstName && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Title is required
//           </small>
//         )}
//       </div>
//     </div>

//     <div>
//       <label htmlFor="">
//         E-mail <span className="text-red-600">*</span>
//       </label>
//       <br />
//       <input
//         {...register("mail", { required: "Email Address is required" })}
//         placeholder="Email"
//         aria-invalid={errors.mail ? "true" : "false"}
//         className="rounded-lg px-5 py-2 border border-b-4 border-[#125b5c]"
//       />
//       <div className="min-h-6">
//         {errors.mail && (
//           <small className="text-[12px] text-red-600" role="alert">
//             Email address is required
//           </small>
//         )}
//       </div>
//     </div>

//     <Button className="px-10 bg-[#147274] hover:bg-[#145e60]">
//       <input type="submit" value="Save" className="cursor-pointer" />
//     </Button>
//   </form>
//   <BorderBeam size={250} duration={12} delay={9} />
// </div>;
