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
      <Logo />
      <NavbarBrand>
        <p className="font-bold text-inherit">Mercado Cercano</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <Link as={NextLink} color="primary" href="/addmarket">
            Agregar mercado
          </Link>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Chip className="cursor-pointer">{session?.user.email}</Chip>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="logout" color="danger" onClick={() => signOut()}>
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
