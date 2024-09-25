import { ModeToggle } from "@/components/mode-toggle";
import { Toaster } from "@/components/ui/sonner";
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen dark:bg-background dark:text-foreground ">
      <header className="p-4 flex justify-end">
        <ModeToggle />
      </header>
      <main>{children}</main>
      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default Layout;
