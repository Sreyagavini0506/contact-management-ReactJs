import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddContact() {

  let [contacts, setContacts] = useState([]);
  let dubphoneNo = false;
  let [dubFoundPhNo, setDubFoundPhNo] = useState(false);
  useEffect(() => {
    getContacts();
  }, [])

  const getContacts = async () => {
    let response = await axios.get("http://localhost:4000/contacts")
    setContacts(response.data);
    console.log(contacts)
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();

  const postContact = async (data) => {



    let response = await axios.post("http://localhost:4000/contacts", data);
    console.log(response.data)
    navigate('/');
  }
//to check for duplicate phone number
  const validatePhoneNo = async (phonenumber) => {
    contacts.map((contact) => {
      if (contact.phoneno === phonenumber)
        dubphoneNo = true;
    })
  }




  const onFormSubmit = (data) => {
    console.log(data)
    validatePhoneNo(data.phoneno);
    if (dubphoneNo === false)
      postContact(data)
    else
      setDubFoundPhNo(true);
    setTimeout(() => {
      setDubFoundPhNo(false)
    }, 3000);

  }
  return (
    <div className='container'>
      <div className='text-center fs-3 fw-bold mb-4'>
        Add Contact
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className='row'>
          <div className='col-6 mb-3'>
            <label htmlFor="firstname">First Name</label>
            <input type="text" className='form-control' id='firstname' {...register("firstname", { required: true })} />
            {errors.firstname?.type === "required" && <p className='text-white fs-6'>* feild is required</p>}
          </div>
          <div className='col-6 mb-3'>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" className='form-control' id='lastname' {...register("lastname", { required: true })} />
            {errors.lastname?.type === "required" && <p className='text-white fs-6'>* feild is required</p>}
          </div>
          <div className=' mb-3'>
            <label htmlFor="phoneno">Phone Number</label>
            <input type="tel" maxLength="10" className='form-control' {...register("phoneno", { required: true })} />
            {errors.phoneno?.type === "required" && <p className='text-white fs-6'>* feild is required</p>}
            {dubFoundPhNo && <p className='text-white fs-6'>Phone Number already exists</p>}
          </div>
          <div className=' mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" className='form-control' {...register("email", { required: true })} />
            {errors.email?.type === "required" && <p className='text-white fs-6'>* feild is required</p>}
          </div>
          <div className='mb-3'>
            <label htmlFor="address">Address</label>
            <textarea name="address" className='form-control' id="address" cols="30"  {...register("address", { required: true })}></textarea>
            {errors.address?.type === "required" && <p className='text-white fs-6'>* feild is required</p>}
          </div>
          <div className='mb-3 text-center'>
            <button className='btn btn-warning w-25' type="submit">Submit</button>
          </div>
        </div>

      </form>
    </div>
  )
}

export default AddContact