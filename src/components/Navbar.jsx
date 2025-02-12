import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { ThemeContext } from "../provider/ContextApi";
import Swal from "sweetalert2";
import fakeUser from "../assets/fakeUser.webp";
import Headroom from "react-headroom";

const Navbar = () => {
  const { user, processing, logOut } = useContext(ThemeContext);
  const photo = user?.photoURL;

  const handleUserImage = (e) => {
    e.target.src = fakeUser;
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f12804",
      cancelButtonColor: "#16A34A",
      confirmButtonText: "Yes, log me out",
      scrollbarPadding: false,
      customClass: {
        title: "text-xl  md:text-3xl font-bold ",
        text: "text-3xl ",
        popup: "text-black rounded-3xl ",
        confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
        cancelButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Logged out!",
              text: "Logout Successful!",
              confirmButtonText: "Okay",
              scrollbarPadding: false,
              showConfirmButton: false,
              timer: 1500,
              customClass: {
                title: "text-xl  md:text-3xl font-bold ",
                text: "text-3xl ",
                popup: "text-black rounded-3xl outline outline-[#16A34A]",
                confirmButton: "bg-[#16A34A] rounded-full py-[10px] px-[30px]",
              },
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed !",
              text: `${error?.code}`,
              confirmButtonText: "Retry",
              scrollbarPadding: false,
              customClass: {
                title: "text-xl md:text-3xl font-bold ",
                text: "text-3xl",
                popup: "bg-white text-black rounded-3xl ",
                confirmButton: "bg-[#f12804] rounded-full py-[10px] px-[30px]",
              },
            });
          });
      }
    });
  };

  return (
    <Headroom>
      <section className="w-full bg-base-100">
        <div className="navbar md:w-10/12 mx-auto  relative z-50">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="px-2 lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <NavLink to="/" className="navLink">
                  Home
                </NavLink>
                {user && (
                  <>
                    <NavLink to="/services" className="navLink">
                      Services
                    </NavLink>
                    <NavLink to="/add-service" className="navLink">
                      Add Service
                    </NavLink>
                    <NavLink to="/my-services" className="navLink">
                      My Services
                    </NavLink>
                    <NavLink to="/my-reviews" className="navLink">
                      My Reviews
                    </NavLink>
                  </>
                )}
              </ul>
            </div>
            <Link
              to="/"
              className="text-sm md:text-2xl font-bold flex items-center gap-1"
            >
              <img className="w-5 md:w-8 hue-rotate-180" src={logo} alt="" />{" "}
              Service Scope
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="flex items-center gap-2 text-sm font-medium">
              <NavLink to="/" className="navLink">
                Home
              </NavLink>
              {user && (
                <>
                  <NavLink to="/services" className="navLink">
                    Services
                  </NavLink>
                  <NavLink to="/add-service" className="navLink">
                    Add Service
                  </NavLink>
                  <NavLink to="/my-services" className="navLink">
                    My Services
                  </NavLink>
                  <NavLink to="/my-reviews" className="navLink">
                    My Reviews
                  </NavLink>
                </>
              )}
            </ul>
          </div>
          <div className="navbar-end pr-2 space-x-1 md:space-x-2">
            {processing ? (
              <>
                <div className="skeleton md:px-6 min-h-max h-max md:py-3 py-1 px-3 md:text-[14px] text-xs rounded-full text-transparent">
                  Login
                </div>

                <div className="skeleton md:px-6 min-h-max h-max md:py-3 py-1 px-3 md:text-[14px] text-xs rounded-full text-transparent">
                  Register
                </div>
                <div className="skeleton hidden md:block md:px-6 min-h-max h-max md:py-3 py-1 px-3 md:text-[14px] text-xs rounded-full text-transparent">
                  Log Out
                </div>

                <div className="skeleton md:h-10 h-6 w-6 md:w-10 shrink-0 rounded-full"></div>
              </>
            ) : (
              <>
                {user ? (
                  <>
                    <button
                      onClick={handleLogOut}
                      className="btn  md:px-6 min-h-max h-max md:py-3 py-1 px-3 md:text-[14px] text-xs rounded-full "
                    >
                      Log Out
                    </button>
                    <label className="swap px-2 swap-rotate">
                      {/* this hidden checkbox controls the state */}
                      <input
                        type="checkbox"
                        className="theme-controller"
                        value="light"
                      />
                      {/* moon icon */}
                      <svg
                        className="swap-on md:h-7 h-5 md:w-7 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                      </svg>

                      {/* sun icon */}
                      <svg
                        className="swap-off md:h-7 h-5 md:w-7 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                      </svg>
                    </label>
                    <img
                      onError={handleUserImage}
                      className="md:w-10 w-6 h-6 md:h-10 rounded-full object-cover"
                      src={photo}
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="btn  md:px-6 min-h-max h-max md:py-3 py-1 px-3 md:text-[14px] text-xs rounded-full"
                    >
                      Login
                    </NavLink>

                    <NavLink
                      to="/register"
                      className="btn  md:px-6 min-h-max h-max md:py-3 py-1 px-3 md:text-[14px] text-xs rounded-full"
                    >
                      Register
                    </NavLink>
                    <label className="swap px-2 swap-rotate">
                      {/* this hidden checkbox controls the state */}
                      <input
                        type="checkbox"
                        className="theme-controller"
                        value="light"
                      />
                      {/* moon icon */}
                      <svg
                        className="swap-on md:h-7 h-5 md:w-7 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                      </svg>

                      {/* sun icon */}
                      <svg
                        className="swap-off md:h-7 h-5 md:w-7 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                      </svg>
                    </label>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </Headroom>
  );
};

export default Navbar;
