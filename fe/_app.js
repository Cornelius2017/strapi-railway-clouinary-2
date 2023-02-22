function MyApp({ Component, pageProps }) {
  return (
    <div className="">
      <h1 className="">
        My personal blog
      </h1>
      <Component {...pageProps} />
    </div>
  );
}