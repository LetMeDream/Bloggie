interface Category {
    id: number;
    title: string;
    image: string;
  }

  const CategoryPreview = ({ category }: { category: Category[] }) => {
  return (
    <div className="w-full flex flex-row md:justify-start lg:justify-start flex-wrap gap-3 mt-3 mb-2 sm:flex-col items-center justify-center">
      {category.map((cat) => (
        <div
          key={cat.id}
          className="w-[175px] cursor-pointer h-[160px] border border-color-gray rounded-lg flex flex-col items-center bg-transparent justify-between transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="w-full rounded-t-lg">
            <img
              className="w-full h-[90px] rounded-t-lg object-cover"
              src={cat.image}
              alt={cat.title}
            />
          </div>
           {/* Contenido */}
            <div className="w-full h-[40%] flex flex-col items-center justify-center bg-white rounded-b-lg leading-tight">
             <p className="text-center pt-1 font-sans mb-0 text-[17px] px-2 font-semibold text-gray-800">
              {cat.title}
             </p>
             <p className="text-center ">
              1 article
             </p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPreview;