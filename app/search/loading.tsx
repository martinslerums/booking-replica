import { Skeleton } from "@/components/ui/skeleton";

const LoadingPage = () => {
  return ( 
    <section>
      <div className="mx-auto max-w-7xl">
        <p className="text-center animate-pulse font-bold text-booking pt-10">
          Be patient - we are collecting data for the best deals around!
        </p>
      </div>
      <div className="flex justify-center py-10">
        <div className="w-10 h-10 bg-booking rounded-full animate-bounce"></div>
      </div>
      <div className="space-y-2 p-5">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="flex space-x-2 mx-auto max-w-7xl">
            <Skeleton className="h-20 w-20 md:w-44 md:h-44 rounded-lg"/>
            <Skeleton className="w-full h-44 rounded-lg"/>
          </div>
        ))}
      </div>

    </section> 
  );
}
 
export default LoadingPage;