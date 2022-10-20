import { useState } from "react";
import axios from "axios";
import nookies from "nookies";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  if (cookies.token) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  }

  return {
    props: {},
  };
}

const Register = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData(() => ({ ...data, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const res = await req.json();
      if (res.jwt) {
        console.log(res);
        setMsg("Congratulations! Account has been registered");
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Register</h1>
        {msg && (
          <div className="bg-green-500 text-white rounded-lg mb-3 p-3 justify-center flex">
            {msg}
          </div>
        )}

        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={handleRegister} className="px-5 py-7 relative">
            {loading && <div className="absolute inset-0 z-10 bg-white/50" />}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Username
            </label>
            <input
              name="username"
              onChange={handleChange}
              type="text"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            />
            <button
              disabled={loading}
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">Register</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
