import { Search, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-50 shadow-lg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Start */}
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link
              className="flex items-center text-secondary text-3xl font-semibold hover:opacity-90 transition"
              href="/"
            >
              <span className="text-primary">VoltStore</span>
            </Link>
          </div>
          {/* Logo End */}

          <div className="flex items-center gap-6">
            {/* Nav Links Start */}
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-8 text-lg">
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-primary"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-primary"
                    href="/collection"
                  >
                    Collection
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-primary"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-700 transition hover:text-primary"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
            {/* Nav Links End */}

            <div className="flex gap-6 items-center">
              <button className="text-gray-700 hover:text-primary transition">
                <Search size={24} />
              </button>
              <Link
                // className="text-gray-700 transition hover:text-primary"
                href="/cart"
              >
                <button className="relative text-gray-700 hover:text-primary transition">
                  <ShoppingCart size={24} />
                  <span className="absolute top-0 right-50 inline-flex items-center justify-center w-3 h-3 bg-primary text-white text-xs font-bold rounded-full">
                    3
                  </span>
                </button>
              </Link>

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Toggle */}
              <div className="block md:hidden">
                <Sheet>
                  <SheetTrigger>
                    <div className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </div>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Navigation</SheetTitle>
                      <SheetDescription>Explore our store</SheetDescription>
                    </SheetHeader>
                    <nav>
                      <ul className="mt-6 flex flex-col gap-4 text-lg">
                        <li>
                          <Link
                            href="/"
                            className="text-gray-700 hover:text-primary"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/collection"
                            className="text-gray-700 hover:text-primary"
                          >
                            Collection
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/about"
                            className="text-gray-700 hover:text-primary"
                          >
                            About
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/contact"
                            className="text-gray-700 hover:text-primary"
                          >
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
