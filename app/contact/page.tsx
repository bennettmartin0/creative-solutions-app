import BusinessCard from "../components/BusinessCard";

export default function Page() {
  return(
    <div className=" transform-3d flex justify-center items-center h-screen bg-neutral-900">
      <img className="transform-3d absolute top-0 left-0 w-full h-full object-cover" src="/img/forest-mountains_2048x1297.jpg" alt="Background" />
      <BusinessCard />
      </div>
  )
}