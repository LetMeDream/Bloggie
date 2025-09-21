import { CategoryType } from "../../types/posts"
import CategoryPreview from "../core/Homapage/CategoryPreview";

const Categories = ({category}: {
  category: CategoryType[];
}) => {
  return (
    <section className='container'>
        <div className='row g-0'>
          <div className='col-12 '>
            <div className='mb-4 pt-4 '>
              <h2>Categories</h2>
            </div>
            <div className='flex flex-wrap mb-4'>
            {category?.length > 0 ? (
            <CategoryPreview category={category || []} />
              ) : (
            <p>No categories found...</p>
              )}          
            </div>
          </div>
        </div>
      </section>
  )
}

export default Categories