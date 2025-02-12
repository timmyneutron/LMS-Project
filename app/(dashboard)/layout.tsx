import Sidebar from "./_components/sidebar";
import NavBar from "./_components/navbar";
import Logo from "./_components/logo";

const DashboardLayout = ({
  children
} : {
  children: React.ReactNode;
}) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <NavBar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 border-r">
        <div className="h-[80px] flex items-center justify-center">
          <Logo />
        </div>
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        {children}
      </main>
    </div>
  );
}
 
export default DashboardLayout;