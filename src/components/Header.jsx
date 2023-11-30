"use client";

import {
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
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  return pathname !== "/signin" ? (
    <Navbar maxWidth="full" isBordered>
      <NavbarBrand as="div" className="gap-5">
        <Logo />
        <p className="font-bold text-inherit">Mercado Cercano</p>
        <ThemeSwitch />
      </NavbarBrand>
      <NavbarContent as="div" justify="center">
        <NavbarItem>
          <Link as={NextLink} color="success" href="/addmarket">
            Agregar mercado
          </Link>
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Chip className="cursor-pointer">{session?.user.email}</Chip>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
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
