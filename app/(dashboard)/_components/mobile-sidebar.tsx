import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import Logo from "./logo";

const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
      <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
        <SheetHeader>
          <SheetTitle>
            <div className="h-[80px] flex items-center justify-center">
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>
        <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar;