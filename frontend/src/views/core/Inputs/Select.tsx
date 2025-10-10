import { useEffect, useState } from 'react'
import { UseFormRegister, SetFieldValue, useWatch, useFormContext } from 'react-hook-form';

interface SelectProps {
  register: UseFormRegister<any>;
  name: string;
  setValue?: SetFieldValue<any>;
  getValues?: (name: string) => any;
  fetchable?: boolean;
  url?: string;
  options?: { id: number; title: string }[];
}

const Select: React.FC<SelectProps> = ({
  register,
  name, 
  setValue,
  getValues,
  fetchable = true,
  url = '',
  options: selectableOptions = []
}) => {
  const [options, setOptions] = useState<any[]>([])

  /* Fetches options if fetchable */
  useEffect(() => {
    const fetchOptions = async () => {
      const baseUrl = 'http://127.0.0.1:8000/api'
      try {
        const response = await fetch(`${baseUrl}${url}`)
        if (!response.ok) throw new Error('Network response was not ok')
        const optionsData = await response.json()
        // console.log(optionsData)
        setOptions(optionsData)
      } catch (error) {
        console.error('Error fetching categories:', error)
        return []
      }
    }

    if (fetchable) {
      fetchOptions()
    } else {
      setOptions(selectableOptions)
    }
  }, [])

  /* useEffect(() => {
    if (options.length) console.log('Fetched options:', options)
  }, [options]) */

  /* Sets default value, defined in Form, in the Select */
  useEffect(() => {
    setTimeout(() => {
      setValue(name, getValues ? getValues(name) : '')
    }, 10)
  }, [name, setValue, options])


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