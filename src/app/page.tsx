const page = async () => {
  return (
    <section className="lg:w-[600px] w-full m-auto flex flex-col">
      <div className="flex flex-col mx-auto lg:mt-64 mt-20">
        <p className="text-2xl font-bold">WELCOME TO THE BEST TWITTER CLONE</p>
        <div className="flex items-center w-full flex-col gap-2 mt-10">
          <a href='/auth/login' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Login
            </span>
          </a>
          <a href='/auth/register' className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Register
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default page
