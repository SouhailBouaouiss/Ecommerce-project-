import { Fragment, useEffect, useState } from "react";
import { Popover, Disclosure, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhoneIncomingIcon,
  PlayIcon,
} from "@heroicons/react/solid";
import {
  ChartPieIcon,
  CursorClickIcon,
  FingerPrintIcon,
  ShoppingCartIcon,
  SearchIcon,
  LoginIcon,
} from "@heroicons/react/outline";
import { ButtonBase } from "@mui/material";
import "./style/upBar.css";

const solutions = [
  // ... (unchanged)
  {
    name: "MEN",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "WOMEN",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "KIDS",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
];
const callsToAction = [
  // ... (unchanged)
  { name: "Watch demo", href: "#", icon: PlayIcon },
  { name: "Contact sales", href: "#", icon: PhoneIncomingIcon },
];

export default function UpBar() {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setScrolled(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="up-bar"
      className={`transition-all ease-in-out duration-300 fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-gray-950" : "bg-transparent"
      }`}
    >
      <Disclosure as="nav">
        {({ open }) => (
          <>
            <div className="mx-auto ms-8">
              <div className="flex justify-between ">
                <div className="relative  flex h-16  ">
                  <div className="flex justify-start gap-20">
                    <div className="flex ">
                      <ButtonBase>
                        <span>HOME</span>
                      </ButtonBase>
                    </div>
                    <div className="flex ">
                      <ButtonBase>
                        <span>SHOP</span>
                      </ButtonBase>
                    </div>
                    <div className="flex mt-5">
                      <Popover className="relative">
                        <Popover.Button
                          className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                          style={{ color: "white" }}
                        >
                          <span>COLLECTIONS</span>
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                              <div className="p-4">
                                {solutions.map((item) => (
                                  <div
                                    key={item.name}
                                    className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                                  >
                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                      <item.icon
                                        className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                        aria-hidden="true"
                                      />
                                    </div>
                                    <div>
                                      <a
                                        href={item.href}
                                        className="font-semibold text-gray-900"
                                      >
                                        {item.name}
                                        <span className="absolute inset-0" />
                                      </a>
                                      <p className="mt-1 text-gray-600">
                                        {item.description}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                {callsToAction.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                  >
                                    <item.icon
                                      className="h-5 w-5 flex-none text-gray-400"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                    </div>
                  </div>
                </div>
                <div className="flex  me-40">
                  <ButtonBase>
                    <strong>
                      <h1
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          fontFamily: "Archivo, sans-serif",
                          fontFamily: "Grupposans-serif",
                          fontFamily: "Kanit, sans-serif",
                          fontFamily: "Montserrat, sans-serif",
                          color: "white",
                        }}
                      >
                        SUNSTYLE
                      </h1>
                    </strong>
                  </ButtonBase>
                </div>
                <div className="flex justify-end me-20 gap-10">
                  <ShoppingCartIcon className="h-6 w-6 mt-5" />
                  <SearchIcon className="h-6 w-6 mt-5" aria-hidden="true" />
                  <LoginIcon className="h-6 w-6 mt-5" aria-hidden="true" />
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>
    </div>
  );
}
