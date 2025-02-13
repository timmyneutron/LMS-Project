import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "@/components/search-input";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<{
    title: string,
    categoryId: string,
  }>
};

const SearchPage = async ({
  searchParams,
}: SearchPageProps) => {
  const { userId } = await auth();
  const { title, categoryId } = await searchParams;

  if (!userId) {
    return redirect("/");
  }
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    title,
    categoryId,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>
      <div className="p-6 space-y-4">
        <Suspense>
          <Categories items={categories} />
        </Suspense>
        <CoursesList items={courses} />
      </div>
    </>
  );
}

export default SearchPage;