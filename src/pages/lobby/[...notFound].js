import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">
        404 - Game Not Found
      </h1>
      <p className="text-2xl text-gray-600 mb-8">
        The game you are searching for either does not exist or is still under development.
      </p>
      <Link href="/">
        Go back home
      </Link>
    </div>
  );
}
