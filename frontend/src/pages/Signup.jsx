export function Signup() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-slate-600 text-black w-full h-screen">
        <div className="w-80 h-max p-6 bg-white rounded-lg flex flex-col items-center justify-center">
          <div className="pb-3">
            <h1 className="text-center font-bold text-xl">Create an account</h1>
            <p className="text-center text-gray-500">
              Enter your info to enjoy seemless payments!
            </p>
          </div>
          <div className="flex flex-col gap-2 p-4 w-full pb-6">
            <input
              placeholder="Enter your First Name"
              className="border-2 border-indigo-950 rounded-lg p-1.5"
            />
            <input
              placeholder="Enter your Last Name"
              className="border-2 border-indigo-950 rounded-lg p-1"
            />
            <input
              placeholder="Enter your Email"
              className="border-2 border-indigo-950 rounded-lg p-1"
            />
            <input
              placeholder="Enter yout Password"
              className="border-2 border-indigo-950 rounded-lg p-1"
            />
            <button className="drop-shadow-lg bg-gray-900 rounded-lg p-2 text-white">
              Signup
            </button>
          </div>
          {/* <div>
            <input type="checkbox" />
            <div>
              By signing up you accept the <span>Terms of services</span> and{" "}
              <span>Privacy policy</span>
            </div>
          </div> */}
          <p>
            Already have an account?{" "}
            <a href="signup.com" className="underline">
              login
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
