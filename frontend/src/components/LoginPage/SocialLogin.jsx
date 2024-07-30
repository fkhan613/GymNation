const SocialLogin = () => {
  return (
    <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <a
          href="#"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <img
            className="h-5 w-5"
            src="https://www.svgrepo.com/show/512120/facebook-176.svg"
            alt="Facebook"
          />
        </a>
        <a
          href="#"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <img
            className="h-5 w-5"
            src="https://www.svgrepo.com/show/513008/twitter-154.svg"
            alt="Twitter"
          />
        </a>
        <a
          href="#"
          className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <img
            className="h-5 w-5 scale-125"
            src="https://www.svgrepo.com/show/506498/google.svg"
            alt="Google"
          />
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
