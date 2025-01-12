import Navbar from "../components/Navbar";
// import Form from "../components/forms/Form";

const FormPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <Navbar />
      {/* <Form /> */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="fixed w-fit h-fit bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow -top-48 -left-48"></div>
        <div className="fixed w-fit h-fit bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow -bottom-48 -right-48"></div>

        {/* Animated lines */}
        <div className="absolute top-10 left-0 w-full h-full">
          {/* <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-right"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left top-1/4 right-0"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-right top-2/4"></div>
          <div className="absolute h-[1px] w-48 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-left top-3/4 right-0"></div> */}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
