interface Category {
    id: number;
    title: string;
    image: string;
  }

  const CategoryPreview = ({ category }: { category: Category[] }) => {
  return (
    <div className="w-full flex flex-row md:justify-start lg:justify-start flex-wrap gap-4 mt-3 mb-2 sm:flex-col items-center justify-center">
      {category.map((cat) => (
        <div
          key={cat.id}
          className="bg-transparent w-[215px] h-[190px] shadow-md rounded-lg flex-shrink flex flex-col items-center justify-between"
        >
          <div className="w-full min-w-[50%] h-[60%] rounded-t-lg">
            <img
              className="w-full h-full rounded-t-lg object-cover"
              src={cat.image}
              alt={cat.title}
            />
          </div>
           {/* Contenido */}
           <div className="w-full h-[40%] flex flex-col items-center justify-center bg-white rounded-b-lg">
            <h5 className="text-center mt-3 mb-0">
              {cat.title}
            </h5>
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