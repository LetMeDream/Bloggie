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
      <label htmlFor='postTHumbnail' className='form-label'>
        Thumbnail
      </label>
      <input
        id='postTHumbnail'
        className='form-control'
        type='file'
        accept='image/*'
        {...register(name)}
        onChange={handleImageChange}
      />
      </div>
      {/* Input Image End */}
      {/* Thumbnail Preview */}
      <div>
      <label htmlFor='postTHumbnail' className='form-label'>
        Preview
      </label>
      <img
        style={{
          maxWidth: '75%',
          objectFit: 'fill',
          borderRadius: '10px',
          margin: '0 auto'
        }}
        className='mb-4'
        src={selectedImage as string || defaultImg}
        alt=''
      />
      </div>
      {/* Thumbnail Preview End */}
    </>
  )
}

export default SelectableImage