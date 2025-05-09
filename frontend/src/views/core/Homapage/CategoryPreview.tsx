interface Category {
    id: number;
    title: string;
    image: string;
  }
  
  const CategoryPreview = ({ category }: { category: Category[] }) => {
    return (
        <>
   {/* Aquí podrías mapear sobre el estado 'category' si quisieras hacerlo dinámico */}
   {category.map((cat) => ( 
    <div key={cat.id} className='mt-2 mr-3'>
      <div className='card bg-transparent shadow-md rounded-lg flex flex-col justify-center align-center'>
        <img className='card-img p-2 mx-auto' src={cat.image} style={{ width: '150px', height: '80px', objectFit: 'cover' }} alt={cat.title} />
        <div className='flex flex-col items-center mt-3 pb-2 px-2'>
          <h5 className='mb-0'>{cat.title}</h5>
          <small>1 article</small>
        </div>
      </div>
    </div>
    ))}
        </>
  )
}

export default CategoryPreview
