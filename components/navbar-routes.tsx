"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";
import { Suspense } from "react";

export const NavbarRoutes = () => {
  const { userId } = useAuth();
  const pathName = usePathname();

  const isTeacherPage = pathName?.startsWith("/teacher");
  const isCoursePage = pathName?.startsWith("/courses");
  const isSearchPage = pathName === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        { isTeacherPage || isCoursePage ?
        (
          <Link href="/">
            <Button>
              <LogOut className="h-4 w-4 mr-2"/>
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ?
          (
            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost">
                Teacher mode
              </Button>
            </Link>
          ) : (
            null
          )}
        <UserButton />
      </div>
    </>
  );
}