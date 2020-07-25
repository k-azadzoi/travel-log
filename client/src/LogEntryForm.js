import React from 'react';
import { useForm } from "react-hook-form";
import { createLogEntry } from './API'

const LogEntryForm = ({ longitude, latitude }) => {

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
      try {
          data.longitude = longitude;
          data.latitude = latitude;
          const created = await createLogEntry(data);
          console.log(created);
      } catch (error) {
          console.error(error); 
      }
  }

  return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className='entry-form'>
            <label htmlFor='title'>Title</label>
            <input name='title' required ref={register} />
            <label htmlFor='comments'>Comments</label>
            <textarea name='comments' rows={3} ref={register}></textarea>
            <label htmlFor='description'>Description</label>
            <textarea name='description' rows={3} ref={register}></textarea>
            <label htmlFor='image'>Image</label>
            <input name='image' ref={register}/>
            <label htmlFor='visitDate'>Visit Date</label>
            <input name='visitDate' type='date' required ref={register} />
            <button type='submit'>Create Visit</button>
        </form>
      </>
  )
}

export default LogEntryForm