import Image from "next/image";
import { listingsData } from "@/app/api/data";

export const ListingsGrid = () => {
  return (
    <div className="grid gap-8">
      {listingsData.map((listing, index) => (
        <div key={index} className="grid lg:grid-cols-2 gap-8 bg-dark_grey bg-opacity-35 rounded-3xl p-8">
          <div className="relative h-[400px]">
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className="object-cover rounded-2xl"
              priority={index === 0}
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-white text-28 mb-4">{listing.title}</h2>
              <p className="text-muted text-opacity-80 text-16 mb-4">
                {listing.address}
              </p>
              <p className="text-muted text-opacity-60 text-18 mb-6">
                {listing.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-deepSlate p-4 rounded-xl">
                  <p className="text-muted text-16">Current Height</p>
                  <p className="text-white text-24">{listing.currentHeight}</p>
                </div>
                <div className="bg-deepSlate p-4 rounded-xl">
                  <p className="text-muted text-16">Max Allowed Height</p>
                  <p className="text-white text-24">{listing.maxHeight}</p>
                </div>
              </div>
              <div className="bg-deepSlate p-4 rounded-xl mb-8">
                <p className="text-muted text-16">Floors to be Bought</p>
                <p className="text-primary text-24">{listing.floorsToBuy}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted text-16">Price</p>
                <p className="text-primary text-32">{listing.price} USDC</p>
              </div>
              <button className="bg-primary text-darkmode px-8 py-3 rounded-lg text-18 font-medium hover:bg-opacity-90 transition-all">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 