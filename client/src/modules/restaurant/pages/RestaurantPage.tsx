import { FetchRestaurantDetail } from "@/api/restaurant/restaurant.queries"
import SideBar from "@/components/Sidebar"
import RestaurantCard from "../components/RestaurantCard";
import type { GetRestaurant } from "@/api/restaurant/restaurant.type";
import PageSkeleton from "@/components/PageSkeleton";

const RestaurantPage = () => {

  const { data, isPending, isError } = FetchRestaurantDetail();

  if (isPending) return <PageSkeleton />
  if (isError) return <>Something went wrong...</>

  return (
    <div className="bg-accent min-h-screen flex">
      <SideBar />
      <div className="flex-1 p-4 overflow-x-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Multiverse Kitchens
            </h1>
            <p className="mt-2 text-pretty text-lg text-muted-foreground leading-relaxed">
              Assemble your order from the finest hero-themed restaurants
            </p>
          </div>
          <RestaurantCard restaurants={data.restaurants as GetRestaurant} />
        </div>
      </div>
    </div>
  )
}

export default RestaurantPage