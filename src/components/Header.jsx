"use client";

import {
  Avatar,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Logo from "./Logo";
import NextLink from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const router = useRouter();
  return pathname !== "/signin" ? (
    <Navbar maxWidth="full" isBordered>
      <NavbarBrand as="div" className="gap-5">
        <Logo />
        <p className="font-bold text-inherit hidden sm:flex">Mercado Cercano</p>
      </NavbarBrand>
      <NavbarContent as="div" justify="center">
        <ThemeSwitch />
        <Dropdown placement="bottom-end">
          <DropdownTrigger className="items-center">
            <div>
              <Chip className="cursor-pointer lg:flex hidden">
                {session?.user.email}
              </Chip>
              <Avatar
                name={`${session?.user.email.toUpperCase().charAt(0) || ""}`}
                className="lg:hidden flex"
              />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem
              key="theme"
              color="success"
              onClick={() => router.push("/addmarket")}
            >
              Agregar mercado
            </DropdownItem>
            <DropdownItem key="theme" color="danger" onClick={() => signOut()}>
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  ) : (
    <></>
  );
};

export default Header;
