import Image from "next/image"

const Footer = () => {
    return (
        <footer className="bg-white">
  <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex justify-center text-teal-600 sm:justify-start">
        <Image src="/logo.png"alt="Logo"width={150}height={150}/>
      </div>

      <p className=" text-center text-sm text-gray-500 lg:text-right">
        Copyright &copy; 2024.
      </p>
    </div>
  </div>
</footer>

    )
}
export default Footer