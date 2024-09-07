"use client";
import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Bell,
  Menu,
  X,
  User,
  LogOut,
  Search,
  Home,
  BookOpen,
  Briefcase,
  School,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinks = () => {
    const commonLinks = [
      { name: "Home", href: "/", icon: Home },
      { name: "About", href: "/about", icon: BookOpen },
    ];

    if (!session) {
      return [
        ...commonLinks,
        { name: "For Students", href: "/for-students", icon: User },
        { name: "For Companies", href: "/for-companies", icon: Briefcase },
      ];
    }

    switch (session.user?.role) {
      case "STUDENT":
        return [
          ...commonLinks,
          { name: "My Profile", href: "/student/profile", icon: User },
          { name: "Job Listings", href: "/student/jobs", icon: Briefcase },
        ];
      case "COLLEGE":
        return [
          ...commonLinks,
          { name: "Verify Students", href: "/college/verify", icon: School },
          { name: "Analytics", href: "/college/analytics", icon: BookOpen },
        ];
      case "TEACHER":
        return [
          ...commonLinks,
          {
            name: "Recommendations",
            href: "/teacher/recommendations",
            icon: BookOpen,
          },
          {
            name: "Research Projects",
            href: "/teacher/research",
            icon: Briefcase,
          },
        ];
      case "COMPANY":
        return [
          ...commonLinks,
          { name: "Search Students", href: "/company/search", icon: Search },
          { name: "Job Postings", href: "/company/jobs", icon: Briefcase },
        ];
      default:
        return commonLinks;
    }
  };

  const links = getLinks();

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h2
                className={`text-2xl font-bold ${
                  scrolled ? "text-indigo-600" : "text-white"
                }`}
              >
                OperantNext
              </h2>
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center ${
                    scrolled
                      ? "text-gray-500 hover:text-gray-900"
                      : "text-white hover:text-gray-200"
                  } px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200`}
                >
                  <link.icon className="h-5 w-5 mr-1" />
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:ml-6 md:space-x-4">
              {status === "authenticated" && (
                <Button variant={scrolled ? "ghost" : "outline"} size="icon">
                  <Bell
                    className={`h-5 w-5 ${
                      scrolled ? "text-gray-500" : "text-white"
                    }`}
                  />
                </Button>
              )}
              {status === "authenticated" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={scrolled ? "ghost" : "outline"}
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={session.user?.image || ""}
                          alt={session.user?.name || ""}
                        />
                        <AvatarFallback>
                          {session.user?.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {session.user?.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {session.user?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => signIn()}
                  variant={scrolled ? "default" : "outline"}
                >
                  Sign In
                </Button>
              )}
            </div>
            <div className="flex md:hidden">
              <Button
                variant={scrolled ? "ghost" : "outline"}
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X
                    className={`block h-6 w-6 ${
                      scrolled ? "text-gray-500" : "text-white"
                    }`}
                  />
                ) : (
                  <Menu
                    className={`block h-6 w-6 ${
                      scrolled ? "text-gray-500" : "text-white"
                    }`}
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="items-center text-gray-600 hover:bg-gray-100 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <link.icon className="h-5 w-5 mr-2" />
                {link.name}
              </Link>
            ))}
            {status === "authenticated" ? (
              <>
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={session.user?.image || ""}
                          alt={session.user?.name || ""}
                        />
                        <AvatarFallback>
                          {session.user?.name?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {session.user?.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {session.user?.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start"
                      onClick={() => signOut()}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="px-5 py-4">
                <Button onClick={() => signIn()} className="w-full">
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
