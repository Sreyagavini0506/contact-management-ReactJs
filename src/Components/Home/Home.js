import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
function Home() {

	let [contacts, setContacts] = useState([]);
	let [editstatus, setEditStatus] = useState({ status: false, currentId: -1 });
	let [saveButtonActive, setSaveButtonActive] = useState(false)

	// Search State
	const [searchItem, setSearchItem] = useState("");

	useEffect(() => {
		getContacts();
	}, [])

	const navigate = useNavigate();

	const { register, handleSubmit, setValue } = useForm()

	// Getting the contacts from the database.json using 
	const getContacts = async () => {
		let response = await axios.get("http://localhost:4000/contacts")
		setContacts(response.data);
		console.log(contacts)
	}

	const deleteContact = async (id) => {
		await axios.delete(`http://localhost:4000/contacts/${id}`);
		console.log("deleted Contact")
		getContacts();
	}

	const navigateToAddContact = () => {
		navigate('/add-contact');
	}

	const editUser = (data) => {
		setSaveButtonActive(true)
		setEditStatus({ ...editstatus, status: true, currentId: data.id });
		setValue("firstname", data.firstname)
		setValue("lastname", data.lastname)
		setValue("phoneno", data.phoneno)
		setValue("email", data.email)
		setValue("address", data.address)
	}

	const updateContact = (newData) => {
		let response = axios.put(`http://localhost:4000/contacts/${editstatus.currentId}`, { ...newData })
		// getContacts();
		window.location.reload()
		setSaveButtonActive(false)
		setEditStatus({ status: false, currentId: -1 })
	}

	return (

		<div className='container'>
			<form onSubmit={handleSubmit(updateContact)}>
				<div className='text-warning fs-3'>
					<p>
						Contact List
						<div className='mt-3 mb-3'>
							<input onChange={(event) => { setSearchItem(event.target.value) }} type="text" id='search' className='form-control' placeholder='Search Contact' />
						</div>
						<span className='d-block text-end'><button onClick={navigateToAddContact} className="btn btn-warning ">Add Contact</button></span>

					</p>
				</div>
				{
					contacts.length === 0 &&
					<div className='text-white'>
						<p className='fs-3'>
							Looks Like there are no Connections
							<br />
							<span className='fs-5'>Please Add Contacts</span>
						</p>
					</div>
				}
				{
					contacts.filter((val) => {
						if (searchItem === "")
							return val
						else if (val.firstname.toLowerCase().includes(searchItem.toLowerCase())) {
							return val
						}
						else if (val.lastname.toLowerCase().includes(searchItem.toLowerCase())) {
							return val
						}
						else if (val.phoneno.toLowerCase().includes(searchItem.toLowerCase())) {
							return val
						}
						else if (val.address.toLowerCase().includes(searchItem.toLowerCase())) {
							return val
						}
						else if (val.email.toLowerCase().includes(searchItem.toLowerCase())) {
							return val
						}
					}).map((data, key) =>
						<div key={key} >
							<div className='rounded row p-3 bg-white text-dark'>
								<div className='col-4'>
									<img className='img-fluid w-25' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Google_Contacts_icon.svg/2048px-Google_Contacts_icon.svg.png' alt="" />
								</div>
								<div className='col-8 card-title'>
									{
										(editstatus.status === true && editstatus.currentId === data.id)
											? <p className='fw-bold'>First Name : <input className='form-control w-50' type="text" {...register("firstname")} /></p>
											: <p className='fw-bold'>First Name : <span className='fw-normal'>{data.firstname}</span></p>

									}
									{
										(editstatus.status === true && editstatus.currentId === data.id)
											? <p className='fw-bold'>Last Name : <input className='form-control w-50' type="text" {...register("lastname")} /></p>
											: <p className='fw-bold'>Last Name : <span className='fw-normal'>{data.lastname}</span></p>

									}

									{
										(editstatus.status === true && editstatus.currentId === data.id)
											? <p className='fw-bold'>Phone Number : <input className='form-control w-50' maxLength="10" type="number" {...register("phoneno")} /></p>
											: <p className='fw-bold'>Phone Number : <span className='fw-normal'>{data.phoneno}</span></p>

									}
									{
										(editstatus.status === true && editstatus.currentId === data.id)
											? <p className='fw-bold'>Email Id : <input className='form-control w-50' type="email" {...register("email")} /></p>
											: <p className='fw-bold'>Email Id : <span className='fw-normal'>{data.email}</span></p>

									}

									{
										(editstatus.status === true && editstatus.currentId === data.id)
											? <p className='fw-bold'>Address : <input className='form-control w-50' type="text-area" {...register("address")} /></p>
											: <p className='fw-bold'>Address : <span className='fw-normal'>{data.address}</span></p>

									}
									<div className=' mb-3'>
										<button type="button" className='btn btn-danger me-3' onClick={() => deleteContact(data.id)}>Remove Contact</button>
										{
											!saveButtonActive
												? <button type="button" className='btn btn-warning' onClick={() => editUser(data)}>Edit Contact</button>
												: <input type="submit" className='btn btn-success' value="Save" />
										}
									</div>
								</div>
							</div>


							<hr />

						</div>
					)
				}
			</form>
		</div>
	)
}

export default Home