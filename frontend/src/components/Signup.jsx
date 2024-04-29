export function Signup() {
  return (
    <>
      <div className="flex flex-col bg-white text-black w-80 h-2/4 p-3.5">
        <div>
          <h1>Create an account</h1>
          <p>Enter your information to enjoy seemless payments!</p>
        </div>
        <div className="flex flex-col">
          <input placeholder="Enter your First Name" />
          <input placeholder="Enter your Last Name" />
          <input placeholder="Enter your Email" />
          <input placeholder="Enter yout Password" />
          <button>Signup</button>
        </div>
        <div>
          <input type="checkbox" />
          <div>
            By signing up you accept the <span>Terms of services</span> and{" "}
            <span>Privacy policy</span>
          </div>
        </div>
        <p>
          Already have an account?<a href="signup.com">signup</a>
        </p>
      </div>
    </>
  );
}
