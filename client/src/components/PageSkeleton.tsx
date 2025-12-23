import SideBar from "./Sidebar"
import { Skeleton } from "./ui/skeleton"

const PageSkeleton = () => {
    return (
        <div className="bg-accent min-h-screen flex">
            <SideBar />
            <div className="flex-1 p-6 max-w-5xl mx-auto space-y-4">
                <Skeleton className="w-full h-2/5 bg-primary-foreground" />
                <Skeleton className="w-full h-2/5 bg-primary-foreground" />
                <Skeleton className="w-full h-2/5 bg-primary-foreground" />
            </div>
        </div>
    )
}

export default PageSkeleton