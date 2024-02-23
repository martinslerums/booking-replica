"use client";

import Link from "next/link";
import { Fragment, useState } from "react";

import { TbBrandBooking } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaChevronDown, FaHome } from "react-icons/fa";
import { HiMiniPaperAirplane, HiChatBubbleLeft, HiPlayCircle, HiPhone } from "react-icons/hi2";

import { Popover, Transition } from "@headlessui/react";;
import MobileHeader from "./MobileHeader";

const products = [
  {
    name: "Book a stay",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: FaHome,
  },
  {
    name: "Book a flight",
    description: "Speak directly to your customers",
    href: "#",
    icon: HiMiniPaperAirplane,
  },
  {
    name: "Contact our Support Team",
    description: "Your customers data will be safe and secure",
    href: "#",
    icon: HiChatBubbleLeft,
  },
];

export type Products = typeof products

const actions = [
  {
    name: "See Demo Booking",
    href: "#",
    icon: HiPlayCircle,
  },
  {
    name: "Contact Support",
    href: "#",
    icon: HiPhone,
  },
];

export type Actions = typeof actions

const anchortags = [
  {
    name: "Flights",
    href: "#",
  },
  {
    name: "Car Rentals",
    href: "#",
  },
  {
    name: "Attractions",
    href: "#",
  },
  {
    name: "Flight + Hotel",
    href: "#",
  },
];

export type Anchortags = typeof anchortags

const Header = () => {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  return (
    <header className="bg-booking">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 md:px-6"
        aria-label="Global"
      >
        <div className="flex md:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Booking.com</span>
            <TbBrandBooking className="h-12 w-auto text-white" />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() =>  setBurgerMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <RxHamburgerMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden md:flex md:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
              Stays
              <FaChevronDown
                className="h-5 w-5 flex-none text-white"
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
              <Popover.Panel className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((product) => (
                    <div
                      key={product.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200">
                        <product.icon
                          className="h-6 w-6 text-booking group-hover:text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={product.href}
                          className="block font-semibold text-booking"
                        >
                          {product.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-booking">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {actions.map((action) => (
                    <a
                      key={action.name}
                      href={action.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-booking hover:bg-gray-100"
                    >
                      <action.icon
                        className="h5 w-5 flex-none text-booking"
                        aria-hidden="true"
                      />
                      {action.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          {anchortags.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white"
            >
              {item.name}
            </a>
          ))}
        </Popover.Group>
        <div className="hidden md:flex md:flex-1 md:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      <MobileHeader 
        onClick={() => setBurgerMenuOpen(false)}
        burgerMenuOpen={burgerMenuOpen}
        setBurgerMenuOpen={setBurgerMenuOpen}
        products={products}
        actions={actions}
        anchortags={anchortags} 
      />

    </header>
  );
}

export default Header;
