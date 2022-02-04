import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        style={{
          borderTopRightRadius: "5rem",
          borderBottomRightRadius: "5rem",
        }}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-28 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gradient-to-r from-gray-200 to-pink-700 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>

          {/* Logo */}
          <NavLink end to="/" className="block">
            <img
              src="https://cariloker.id/storage/perusahaan/logo-sas.png"
              className="w-10 h-10 rounded-full"
              alt="logo"
            />
          </NavLink>
        </div>
        {/* Links */}
        <div className="space-y-8 ">
          {/* Pages group */}
          <div>
            <h3 className="text-xs uppercase text-slate-200 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Pages
              </span>
            </h3>

            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`px-3 py-2  rounded-xl mb-8 last:mb-0 ${
                  pathname === "/" && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/"
                  className={`block font-bold text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname === "/" && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname === "/" && "!text-indigo-500"
                        }`}
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname === "/" && "text-indigo-600"
                        }`}
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname === "/" && "text-indigo-200"
                        }`}
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                      />
                    </svg>
                    <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Dashboard
                    </span>
                  </div>
                </NavLink>
              </li>
              {/* Analytics */}
              <li
                className={`px-3 py-2 rounded-sm mb-8 last:mb-0 ${
                  pathname.includes("analytics") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/analytics"
                  className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                    pathname.includes("analytics") && "hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        className={`fill-current text-slate-600 ${
                          pathname.includes("analytics") && "text-indigo-500"
                        }`}
                        d="M0 20h24v2H0z"
                      />
                      <path
                        className={`fill-current text-slate-400 ${
                          pathname.includes("analytics") && "text-indigo-300"
                        }`}
                        d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"
                      />
                    </svg>
                    <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      Analytics Data
                    </span>
                  </div>
                </NavLink>
              </li>

              {/* MASTER DATA */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 mb-8 hover:text-white truncate transition duration-150 ${
                          pathname.includes("datamaster") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="shrink-0 h-6 w-6"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-400 ${
                                  pathname.includes("datamaster") &&
                                  "text-indigo-300"
                                }`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current text-slate-700 ${
                                  pathname.includes("datamaster") &&
                                  "!text-indigo-600"
                                }`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current text-slate-600 ${
                                  pathname.includes("datamaster") &&
                                  "text-indigo-500"
                                }`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                              />
                            </svg>
                            <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Master Data
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-200 ${
                                open && "transform rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`ml-3 pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/datamaster"
                              className={`block hover:text-slate-200 transition duration-150 truncate ${
                                !pathname.includes("datamaster")
                                  ? "text-slate-200"
                                  : "text-slate-900"
                              }`}
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Data Cabang
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/jenisbarang"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Jenis Barang Inventaris
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Level User
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Data Kendraan Operasional
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Data Pengguna
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Data Tipe Servis untuk Pengadaan
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* INVENTORY */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 mb-8 hover:text-white truncate transition duration-150 ${
                          pathname.includes("inventory") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-building-bank h-6 w-6"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <line x1="3" y1="21" x2="21" y2="21" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                              <polyline points="5 6 12 3 19 6" />
                              <line x1="4" y1="10" x2="4" y2="21" />
                              <line x1="20" y1="10" x2="20" y2="21" />
                              <line x1="8" y1="14" x2="8" y2="17" />
                              <line x1="12" y1="14" x2="12" y2="17" />
                              <line x1="16" y1="14" x2="16" y2="17" />
                            </svg>
                            <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Inventory
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-200 ${
                                open && "transform rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            {/* gruping purchasing data */}
                            <SidebarLinkGroup>
                              {(handleClick, open) => {
                                return (
                                  <React.Fragment>
                                    <a
                                      href="#0"
                                      className={` block text-slate-200 hover:text-white truncate transition duration-150 ${
                                        pathname.includes("datamaster") &&
                                        "hover:text-slate-200"
                                      }`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        sidebarExpanded
                                          ? handleClick()
                                          : setSidebarExpanded(true);
                                      }}
                                    >
                                      <div className="flex justify-start">
                                        <div className="flex items-center">
                                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                            Purchasing
                                          </span>
                                        </div>
                                        {/* Icon */}
                                        <div className="flex shrink-0 ml-2">
                                          <svg
                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                              open && "transform rotate-180"
                                            }`}
                                            viewBox="0 0 12 12"
                                          >
                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                          </svg>
                                        </div>
                                      </div>
                                    </a>
                                    <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                      <ul
                                        className={`pl-1 mt-1 ${
                                          !open && "hidden"
                                        }`}
                                      >
                                        <li className="mb-1 last:mb-0">
                                          <NavLink
                                            end
                                            to="/"
                                            className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                                          >
                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              Request
                                            </span>
                                          </NavLink>
                                        </li>
                                        <li className="mb-1 last:mb-0">
                                          <NavLink
                                            end
                                            to="/"
                                            className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                                          >
                                            <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                              Order
                                            </span>
                                          </NavLink>
                                        </li>
                                      </ul>
                                    </div>
                                  </React.Fragment>
                                );
                              }}
                            </SidebarLinkGroup>
                          </li>
                          <li className="ml-3 mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Manajemen asset
                              </span>
                            </NavLink>
                          </li>
                          <li className="ml-3 mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Pengadaaan barang dan jasa
                              </span>
                            </NavLink>
                          </li>
                          <li className="ml-3 mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Pengadaaan Part Kendraan/Unit Mobil
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* DOCUMENT */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 mb-8 hover:text-white truncate transition duration-150 ${
                          pathname.includes("document") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 icon icon-tabler icon-tabler-file-report"
                              width="44"
                              height="44"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <circle cx="17" cy="17" r="4" />
                              <path d="M17 13v4h4" />
                              <path d="M12 3v4a1 1 0 0 0 1 1h4" />
                              <path d="M11.5 21h-6.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v2m0 3v4" />
                            </svg>
                            <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Document
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-200 ${
                                open && "transform rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="ml-3 mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Data Dokumen
                              </span>
                            </NavLink>
                          </li>
                          <li className="ml-3 mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Pencatatan Pengoperasian Kendraan
                              </span>
                            </NavLink>
                          </li>

                          <SidebarLinkGroup>
                            {(handleClick, open) => {
                              return (
                                <React.Fragment>
                                  <a
                                    href="#0"
                                    className={` block text-slate-200 hover:text-white truncate transition duration-150 ${
                                      pathname.includes("datamaster") &&
                                      "hover:text-slate-200"
                                    }`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      sidebarExpanded
                                        ? handleClick()
                                        : setSidebarExpanded(true);
                                    }}
                                  >
                                    <div className="flex justify-start">
                                      <div className="flex items-center">
                                        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                          Laporan
                                        </span>
                                      </div>
                                      {/* Icon */}
                                      <div className="flex shrink-0 ml-2">
                                        <svg
                                          className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                            open && "transform rotate-180"
                                          }`}
                                          viewBox="0 0 12 12"
                                        >
                                          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                        </svg>
                                      </div>
                                    </div>
                                  </a>
                                  <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                                    <ul
                                      className={`pl-1 mt-1 ${
                                        !open && "hidden"
                                      }`}
                                    >
                                      <li className="mb-1 last:mb-0">
                                        <NavLink
                                          end
                                          to="/"
                                          className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                                        >
                                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                            Laporan Inventaris
                                          </span>
                                        </NavLink>
                                      </li>
                                      <li className="mb-1 last:mb-0">
                                        <NavLink
                                          end
                                          to="/"
                                          className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                                        >
                                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                            Laporan Pengeluaran Operasional dari
                                            Kendaraan
                                          </span>
                                        </NavLink>
                                      </li>
                                      <li className="mb-1 last:mb-0">
                                        <NavLink
                                          end
                                          to="/"
                                          className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                                        >
                                          <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                            Laporan Riwayat Barang
                                            Non-Inventaris
                                          </span>
                                        </NavLink>
                                      </li>
                                    </ul>
                                  </div>
                                </React.Fragment>
                              );
                            }}
                          </SidebarLinkGroup>
                          <li className="ml-3 mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Ticketing
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* MAP TRACKING */}
              <SidebarLinkGroup>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block text-slate-200 mb-8 hover:text-white truncate transition duration-150 ${
                          pathname.includes("settings") &&
                          "hover:text-slate-200"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 icon icon-tabler icon-tabler-map-search"
                              width="44"
                              height="44"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v10" />
                              <path d="M9 4v13" />
                              <path d="M15 7v5" />
                              <circle cx="16.5" cy="17.5" r="2.5" />
                              <path d="M18.5 19.5l2.5 2.5" />
                            </svg>
                            <span className="text-lg font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Map Tracking
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="flex shrink-0 ml-2">
                            <svg
                              className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-200 ${
                                open && "transform rotate-180"
                              }`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        <ul className={`ml-3 pl-9 mt-1 ${!open && "hidden"}`}>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              end
                              to="/"
                              className="block text-slate-200 hover:text-slate-200 transition duration-150 truncate"
                            >
                              <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Tracking
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-200"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-200" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
