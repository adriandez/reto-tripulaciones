import Cookies from "universal-cookie";

const cookies = new Cookies();

const Logout = () => {
  const Logout = () => {
    cookies.remove("reto");
    window.location = "/home";
  };

  return (
    <>
      <section>
        <button onClick={Logout}>Logout</button>
      </section>
    </>
  );
};

export default Logout;
