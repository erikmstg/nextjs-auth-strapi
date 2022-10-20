import nookies from "nookies";

export async function getServerSideProps({
  query: { access_token, provider },
  ...ctx
}) {
  const req = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/auth/${provider}/callback?access_token=${access_token}`
  );
  const res = await req.json();

  if (res.jwt) {
    nookies.set(ctx, "token", res.jwt, {
      path: "/",
    });

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

export default function Connect() {
  return <div>halo</div>;
}
