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
  Switch,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Logo from "./Logo";
import NextLink from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header>
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
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </header>
  );
};

export default Header;
