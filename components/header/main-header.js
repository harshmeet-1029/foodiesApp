import Link from "next/link";
import logoImg from "@/assets/logo.png";

import classes from "./CSS/main-header.module.css";
import Image from "next/image";
import MainHeaderBackground from "./main-header-background";

import NavLink from "../customLink/nav-link";

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href={"/"}>
          <Image alt="A plate with food on it" src={logoImg} priority />
          NextLevel Food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href={"/meals"}>Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href={"/community"}>Foodie Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default MainHeader;
