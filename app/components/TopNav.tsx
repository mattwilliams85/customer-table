import Image from "next/image";
import Link from "next/link";

const TopNav = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-[#645ef6] text-white">
      <div className="mx-auto max-w-[1028px] w-[1028px] flex justify-between">
        <div className="flex items-center space-x-6">
          <span className="text-xl font-bold">
            <Image
              src="/customer.svg"
              alt="logo"
              width="200"
              height="20"
              priority
            />
          </span>
        </div>

        <div>
          <Link href="https://customer.io" className="font-medium">
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
