import Image from "next/image";
import { fetchResults } from "@/lib/fetchResults";
import { notFound } from "next/navigation";
import Link from "next/link";

type SearchPageProps = {
  searchParams: searchParams;
};

export type searchParams = {
  url: URL;
  group_adults: string;
  group_children: string;
  no_rooms: string;
  checkin: string;
  checkout: string;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  if (!searchParams.url) return notFound();

  const results = await fetchResults(searchParams);
  
  if (!results) return <div>No matching results found...</div>;

  return (
    <section>
      <div className="mx-auto max-w-6xl p-6 md:px-8">
        <h1 className="text-4xl font-bold pb-3">
          Your Booking Request Results
        </h1>
        <h2 className="pb-3 text-gray-500">
          Dates of booking:
          <span className="italic ml-2 text-gray-500">
            {searchParams.checkin} to {searchParams.checkout}
          </span>
        </h2>

        <hr className="mb-5" />

        <h3 className="font-semibold text-xl">
          {results.content.total_listings}
        </h3>

        <div className="space-y-2 mt-5">
          {results.content.listings.map((item, index) => (
            <div
              key={index}
              className="flex space-y-2 justify-between space-x-4 p-5 border rounded-lg"
            >
              <Image src={item.url} alt={item.title} width={200} height={200} />
              <div className="flex flex-1 space-x-5 justify-between">
                <div>
                  <Link
                    href={item.link}
                    className="font-bold text-blue-500 hover:text-blue-600 hover:underline text-2xl"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm">{item.description}</p>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="flex items-start justify-end space-x-2 text-right">
                    <div>
                      <p className="font-bold">{item.rating_word}</p>
                      <p className="text-xs">{item.rating_count}</p>
                    </div>
                    <p className="flex items-center justify-center font-bold text-sm w-10 h-10 text-white bg-blue-900 rounded-lg flex-shrink-0">
                      {item.rating || "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs">{item.booking_metadata}</p>
                    <p className="text-2xl font-bold">{item.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
