import { useEffect, useState } from 'react'
import { UseFormRegister, SetFieldValue, useWatch } from 'react-hook-form';

interface SelectProps {
  register: UseFormRegister<any>;
  name: string;
  setValue?: SetFieldValue<any>;
}

const Select: React.FC<SelectProps> = ({
  register,
  name, 
  setValue
}) => {
  const [options, setOptions] = useState<any[]>([])
  const watchedValue = useWatch({ name })

  useEffect(() => {
    const fetchOptions = async () => {
      const baseUrl = 'http://127.0.0.1:8000/api'
      try {
        const response = await fetch(`${baseUrl}/post/category/list`)
        // if (!response.ok) throw new Error('Network response was not ok')
        const optionsData = await response.json()
        console.log(optionsData)
        setOptions(optionsData)
      } catch (error) {
        console.error('Error fetching categories:', error)
        return []
      }
    }

    fetchOptions()
  }, [])

  useEffect(() => {
    if (options.length) console.log('Fetched options:', options)
  }, [options])

  useEffect(() => {
    setTimeout(() => {
      setValue(name, 6)
    }, 100)
  }, [name, setValue, watchedValue])


  return (
    <select className='form-select' {...register(name)}>

      <option value=''>-------------</option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.title}
        </option>
      ))}
    </select>
  )
}

export default Select