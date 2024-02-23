import { TbBrandBooking } from "react-icons/tb";
import { FaXmark, FaChevronDown } from "react-icons/fa6";

import { cn } from "@/lib/utils";
import { Dialog, Disclosure } from "@headlessui/react";
import { Actions, Anchortags, Products } from "./Header";

type MobileHeaderProps = {
  actions: Actions;
  products: Products;
  anchortags: Anchortags;
  onClick: () => void;
  burgerMenuOpen: boolean;
  setBurgerMenuOpen: (open: boolean) => void;
}

const  MobileHeader = ({onClick, burgerMenuOpen, setBurgerMenuOpen, products, actions, anchortags}: MobileHeaderProps) => {
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={burgerMenuOpen}
      onClose={setBurgerMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-booking px-6 py-6 md:max-w-md md:right-1 md:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Booking.com</span>
            <TbBrandBooking className="h-8 w-auto text-white" />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-white"
            onClick={() => onClick()}
          >
            <span className="sr-only">Close menu</span>
            <FaXmark className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              <Disclosure as="div" className="-mx-3">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-blue-800">
                      Stays
                      <FaChevronDown
                        className={cn(
                          open ? "rotate-180" : "",
                          "h-5 w-5 flex-none"
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="mt2 space-y-2">
                      {[...products, ...actions].map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-blue-800"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              {anchortags.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800"
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="py-6">
              <a
                href="#"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-blue-800"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default MobileHeader;
