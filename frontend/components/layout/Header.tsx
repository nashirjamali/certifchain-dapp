"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAccount, useDisconnect } from "wagmi";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@/components/ui/resizable-navbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet, LayoutDashboard, LogOut, User } from "lucide-react";

interface HeaderProps {
  user?: unknown;
  walletAddress?: `0x${string}`;
  onConnect?: () => void;
}

type UserRole = "ADMIN" | "INSTITUTION" | "RECIPIENT" | null;

export function Header({ user, walletAddress, onConnect }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loadingRole, setLoadingRole] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();
  const connectedAddress = walletAddress || address;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!connectedAddress || !isConnected) {
        setUserRole(null);
        return;
      }

      setLoadingRole(true);
      try {
        const response = await fetch(`/api/auth/user?walletAddress=${connectedAddress}`);
        const data = await response.json();
        
        if (data.success && data.user) {
          setUserRole(data.user.role);
        } else {
          setUserRole(null);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setUserRole(null);
      } finally {
        setLoadingRole(false);
      }
    };

    fetchUserRole();
  }, [connectedAddress, isConnected]);

  const getDashboardLink = () => {
    if (userRole === "INSTITUTION" || userRole === "ADMIN") {
      return "/institution/dashboard";
    }
    return "/dashboard";
  };

  const defaultDashboardLink = "/dashboard";
  const dashboardLink = mounted && userRole ? getDashboardLink() : defaultDashboardLink;


  const navItems = [
    { name: "Verify", link: "/verify" },
    { name: "Dashboard", link: dashboardLink },
    { name: "How It Works", link: "/how-it-works" },
  ];

  return (
    <Navbar className="top-10">
      <NavBody>
        <Link
          href="/"
          className="relative z-20 flex items-center space-x-2 px-2 py-1 text-xl font-bold text-black dark:text-white"
        >
          <span>CertiChain</span>
        </Link>
        <NavItems items={navItems} />
        <div className="flex items-center gap-2">
          {mounted && (connectedAddress || isConnected) ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {connectedAddress?.slice(0, 6)}...{connectedAddress?.slice(-4)}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {userRole === "INSTITUTION" ? "Institution" : userRole === "ADMIN" ? "Admin" : "Recipient"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono truncate">
                        {connectedAddress}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={dashboardLink} className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Go to Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    setUserRole(null);
                    disconnect();
                  }}
                  disabled={isDisconnecting}
                  className="cursor-pointer"
                >
                  {isDisconnecting ? (
                    <>
                      <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Disconnecting...
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4 mr-2" />
                      Disconnect Wallet
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <NavbarButton
                as="span"
                variant="primary"
                className="flex items-center gap-1.5"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </NavbarButton>
            </Link>
          )}
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <Link
            href="/"
            className="relative z-20 flex items-center space-x-2 px-2 py-1 text-xl font-bold text-black dark:text-white"
          >
            <span>CertiChain</span>
          </Link>
          <div className="flex items-center gap-2">
            {mounted && (connectedAddress || isConnected) ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs">
                    <Wallet className="h-3 w-3" />
                    <span className="font-mono">
                      {connectedAddress?.slice(0, 4)}...{connectedAddress?.slice(-4)}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <User className="h-3 w-3 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {userRole === "INSTITUTION" ? "Institution" : userRole === "ADMIN" ? "Admin" : "Recipient"}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono truncate">
                          {connectedAddress}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={dashboardLink} className="cursor-pointer">
                      <LayoutDashboard className="h-3 w-3 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setUserRole(null);
                      disconnect();
                    }}
                    disabled={isDisconnecting}
                    className="cursor-pointer"
                  >
                    {isDisconnecting ? (
                      <>
                        <div className="h-3 w-3 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Disconnecting...
                      </>
                    ) : (
                      <>
                        <LogOut className="h-3 w-3 mr-2" />
                        Disconnect
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <NavbarButton
                  as="span"
                  variant="primary"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5"
                >
                  <Wallet className="h-3 w-3" />
                  Connect
                </NavbarButton>
              </Link>
            )}
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </MobileNavHeader>
        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.link}
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium"
            >
              {item.name}
            </Link>
          ))}
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
