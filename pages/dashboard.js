import Router from "next/router";
import nookies from "nookies";

export function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  if (!cookies.token) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }

  return {
    props: {},
  };
}

const Dashboard = () => {
  const handleLogout = () => {
    nookies.destroy(null, "token");
    Router.replace("/login");
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center flex-col">
      <h1>Dashboard</h1>
      <div>
        <button
          onClick={handleLogout}
          className="bg-green-400 m-2 p-3 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
