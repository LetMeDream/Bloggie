interface Category {
    id: number;
    post_count: number;
    title: string;
    image: string;
  }

  const CategoryPreview = ({ category }: { category: Category[] }) => {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] md:place-items-center lg:place-items-center gap-3 md:gap-4 lg:gap-4">
      {category.map((cat) => (
        <div
          key={cat.id}
          className="sm:w-[160px] h-40 cursor-pointer border border-color-gray rounded-lg flex flex-col items-center bg-transparent justify-between transition-shadow duration-300 hover:shadow-sm delay-50"
        >     <img
              className="w-full h-20 rounded-t-lg mb-1 object-cover"
              src={cat.image}
              alt={cat.title}
            />
           {/* Contenido */}
             <p className="text-center leading-tight font-sans mb-0 text-base px-2 font-bold text-gray-800">
              {cat.title}
             </p>
             <p className="text-center text-zinc-800">
              {cat.post_count} articles
             </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryPreview;