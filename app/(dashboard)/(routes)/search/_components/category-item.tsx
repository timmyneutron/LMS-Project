"use client";

import qs from "query-string";
import { cn } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { IconType } from "react-icons";

interface CategoryItemProps {
  label: string;
  value?: string;
  icon?: IconType;
};

export const CategoryItem = ({
  label,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelected = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelected ? null : value,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
       className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
       )}
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">
        {label}
      </div>
    </button>
  );
};