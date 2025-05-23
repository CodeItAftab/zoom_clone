"use client";
import React from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[256px] ">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/icons/hamburger.svg"}
            alt="hamburger icon"
            width={36}
            height={36}
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1">
          <SheetHeader className="h-0 w-0 overflow-hidden hidden">
            <SheetTitle className="text-white">Menu</SheetTitle>
            <SheetDescription className="text-white">
              Manage your account settings and set e-mail preferences.
            </SheetDescription>
          </SheetHeader>
          <Link href={"/"} className="flex items-center gap-1 p-4">
            <Image
              src={"/icons/logo.svg"}
              alt="Yoom logo"
              width={32}
              height={32}
              className="max-sm:size-10"
            />
            <p className="text-[26px] font-extrabold text-white ">Yoom</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto ">
            {/* <SheetClose asChild> */}
            <section className="flex h-full flex-col gap-6 px-6 pt-16 text-white">
              {sidebarLinks.map((link) => {
                const isAcitve =
                  pathname === link.route ||
                  pathname.startsWith(link.route + "/");

                return (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.route}
                      className={cn(
                        "flex gap-4 items-center p-4 rounded-lg w-full",
                        {
                          "bg-blue-1": isAcitve,
                        }
                      )}
                    >
                      <Image
                        src={link.imgUrl}
                        alt={link.label}
                        height={24}
                        width={24}
                      />
                      <p className="font-semibold ">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </section>
            {/* </SheetClose> */}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
