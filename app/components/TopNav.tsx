import Link from "next/link";

const TopNav = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <div className="flex items-center space-x-6">
        <span className="text-xl font-bold">Logo</span>
        <Link href="/" className="text-gray-700 hover:text-blue-500">
          Home
        </Link>
        <Link href="/customers" className="text-gray-700 hover:text-blue-500">
          Customers
        </Link>
      </div>

      <div>
        <Link href="/logout" className="text-red-500 hover:text-red-700">
          Log Out
        </Link>
      </div>
    </nav>
  );
};

export default TopNav;
