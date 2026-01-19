import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { useState } from 'react'
// @ts-ignore
import defaultImg from '../../../assets/default.png'

const SelectableImage = ({ register, name }: { register: UseFormRegister<any>, name: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      {/* Input Image */}
      <div>
      <label htmlFor='postThumbnail' className='form-label'>
        Thumbnail
      </label>
      <input
        id='postThumbnail'
        className='form-control'
        type='file'
        accept='image/*'
        {...register(name)}
        onChange={handleImageChange}
        required
      />
      </div>
      {/* Input Image End */}
      {/* Thumbnail Preview */}
      <div>
      <label htmlFor='postThumbnail' className='form-label'>
        Preview
      </label>
      <img
        style={{
          maxWidth: '75%',
          objectFit: 'fill',
          borderRadius: '10px',
          margin: '0 auto'
        }}
        className='mb-4 cursor-pointer'
        src={selectedImage as string || defaultImg}
        alt=''
        onClick={() => {
          const imgInput = document.getElementById('postThumbnail')
          imgInput?.click()
        }}
      />
      </div>
      {/* Thumbnail Preview End */}
    </>
  )
}

export default SelectableImage