import React from 'react'
import CreatableSelect from 'react-select/creatable'
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import { AddPostForm } from '../../../types/posts'

const selectableOptions = [
  { value: 'health', label: 'Health' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'fitness', label: 'Fitness' }
]

const Creatable = ({ setValue, label, getValues }: { setValue: UseFormSetValue<AddPostForm>, label: string, getValues: UseFormGetValues<AddPostForm> }) => {
  return (
    <>
      <label className='form-label'>{label}</label>
        <CreatableSelect
          defaultValue={getValues('tags') ? getValues('tags').map(tag => ({ value: tag, label: tag })) : []}
          isClearable
          isMulti
          options={selectableOptions}
          onChange={(selected) => {
            let values: string[] = []
            selected.forEach((item) => {
              values.push(item.value)
            })
            setValue('tags', values);
          }}
        />
    </>
  )
}

export default Creatable