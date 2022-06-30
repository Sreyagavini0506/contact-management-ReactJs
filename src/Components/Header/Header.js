import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate, NavLink } from 'react-router-dom';
import AddContact from '../Add Contact/AddContact';
import Home from '../Home/Home';

function Header() {
	const navigate = useNavigate();

	const navigateToLoginPage = () => {
		navigate('/');
	}
	
	return (
		<div className='text-warning'>
			<nav className="p-3 pt-3 navbar navbar-expand-lg navbar-light bg-dark bg-gradient">
				<div className=" container-fluid">
					<NavLink to="/" className='nv text-center navbar-brand text-warning' style={{ fontSize: "1.5rem" }}>Contact Management App</NavLink>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-5">
							<li className="nav-item text-right ">
								<button onClick={navigateToLoginPage} className='fs-6 btn btn-warning'>Home</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/add-contact' element={<AddContact />} />
			</Routes>
		</div>
	)
}

export default Header