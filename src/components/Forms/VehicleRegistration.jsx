import { useState,useEffect } from 'react';
import { Navbar } from '../exports';
import Header from '../../assets/2022.png';
import axios from 'axios';
import CarLoad from '../Animations/CarLoad';

const VehicleRegistration = () => {

  const [form, setForm] = useState({});
  const [shows, setShows] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoaded(false);
    if(!validate(form)) {
      return;
    }

    const data = new FormData();

    for ( var key in form ) {
      data.append(key, form[key]);
    }
    console.log(data);

    axios.post("http://localhost:5000/register-vehicle",data, {
      header: {
        contentType: "multipart/form-data"
      }
    })
      .then(res => {
        setLoaded(true);
      }, rej => {
        setLoaded(true);
        console.log(rej);
      })
  }


  useEffect(() => {
    axios.get("http://localhost:5000/shows")
    .then(res => {
      setShows(res.data);
      setLoaded(true);
    }, rej => {console.log(rej)});
  },[]);


  const handleChange = (e) => {
    if(e.target.name === 'img1' || e.target.name === 'img2'){
      setForm({...form, [e.target.name]:e.target.files[0]});
    }
    else
      setForm({...form,[e.target.name]:e.target.value})
  }

  const isbool = val => {
    return val === "true" || val === "false"
  }

  const validate = (data) => {
    const asserts = [
      typeof data.fName  === 'string',
      typeof data.lName === 'string',
      typeof data.email === 'string',
      !isNaN(data.age),
      !isNaN(data.phone),
      typeof data.entry === 'string',
      !isNaN(data.year),
      typeof data.model === 'string',
      typeof data.make === 'string',
      typeof data.class === 'string',
      typeof data.address === 'string',
      typeof data.city === 'string',
      typeof data.state === 'string',
      !isNaN(data.zip),
      !data.pastShows || typeof data.pastShows === 'string',
      !data.pastAwards || typeof data.pastAwards === 'string',
      !data.trunk || isbool(data.trunk),
      !data.engine ||isbool(data.engine),
      !data.undercarriage || isbool(data.undercarriage),
      !data.twentyTwenty || isbool(data.twentyTwenty),
      !data.club || typeof data.club === 'string',
      !data.nickname || typeof data.nickname === 'string',
      !data.typePaint || typeof data.typePaint === 'string',
      !data.upholstery || typeof data.upholstery === 'string',
      !data.mods || typeof data.mods === 'string',
      typeof data.electricity === 'string',
    ];
    return !asserts.includes(false);
  }

  if(!loaded) return <CarLoad/>
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className = "form-page">
      <Navbar/>
      <div className = 'form-section header'>
          <img alt="" src={Header}/>
          <h1>Upcoming Events</h1>
          {shows.map(show => 
            <div className = 'show'> {/*Put in for loop to fetch all shows from DB*/}
              <input onChange = {handleChange} name = 'show' type = "radio" value = {show.description} required/>
              <label htmlFor='show'>{show.description}</label>
            </div>
          )}
          <div className = 'disclaimer'>
            No substitutions ⬥ No Transfers ⬥ No Refunds
          </div>
      </div>
      <div className = 'form-section'>
        <h1>Customer Information</h1>
        <h2>Personal Details</h2>
        <div className = 'input-row'>
            <input 
            name = 'fName' 
            autoComplete='off'
            type="text"
            placeholder="First Name*"
            onChange={handleChange}
            required
            />
            <input 
            name = 'lName' 
            autoComplete='off'
            type="text"
            placeholder="Last Name*"
            onChange={handleChange}
            required
            />
        </div>
        <div className = 'input-row'>
            <input 
            name = 'email' 
            autoComplete='off'
            type="email"
            placeholder="Email*"
            onChange={handleChange}
            required
            />
            <input 
            name = 'phone' 
            autoComplete='off'
            type="number"
            placeholder="Phone Number*"
            onChange={handleChange}
            required
            />
        </div>
        <div className = 'age-container'>
          <input onChange = {handleChange} className = 'age sm' type = 'number' autoComplete='off' name = 'age' placeholder = "age*" min = '0' required/>
        </div>
        <h2>Address</h2>
        <div className='input-row'>
          <input 
            name = 'address' 
            autoComplete='off'
            type="text"
            placeholder="Address*"
            onChange={handleChange}
            required
            />
          <input 
            name = 'city' 
            autoComplete='off'
            type="text"
            placeholder="city*"
            onChange={handleChange}
            required
            />
        </div>
        <div className='input-row sm'>
          <input 
            className='sm'
            name = 'state' 
            autoComplete='off'
            type="text"
            placeholder="State*"
            onChange={handleChange}
            required
            />
          <input 
            className='sm'
            name = 'zip' 
            autoComplete='off'
            type="number"
            min='0'
            placeholder="Zip*"
            onChange={handleChange}
            required
            />
        </div>
      </div>
      <div className = 'form-section'>
        <h1>Vehicle Information</h1>
        <h2>Type of Entry*</h2>
        <div className = 'input-row'>
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='entry' value='Car'/>
            <label htmlFor='entry'>Car</label>
          </div>
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='entry' value='Truck'/>
            <label htmlFor='entry'>Truck</label>
          </div>
        </div>
        <div className = "input-row">
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='entry' value='Bike'/>
            <label htmlFor='entry'>Bike</label>
          </div>
        </div>
        <div className = "input-row">
          <input className = 'med' onChange={handleChange} name = "year" type='number' min='0' placeholder='Year*' required/>
          <input className = 'med' onChange={handleChange} name = "model" type='text' placeholder='Model*' required/>
          <input className = 'med' onChange={handleChange} name = "make" type='text' placeholder='Make*' required/>
        </div>
        <h2>Classification*</h2>
        <div className = 'input-row'>
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='class' value='original' required/>
            <label htmlFor='entry'>Original</label>
          </div>
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='class' value='street-custom'/>
            <label htmlFor='entry'>Street Custom</label>
          </div>
        </div>
        <div className = 'input-row'>
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='class' value='mild-custom'/>
            <label htmlFor='entry'>Mild Custom</label>
          </div>
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='class' value='semi-custom'/>
            <label htmlFor='entry'>Semi-Custom</label>
          </div>
        </div>
        <div className = 'input-row'>
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='class' value='full-custom'/>
            <label htmlFor='entry'>Full Custom</label>
          </div>
          <div className = 'entry'>
            <input onChange = {handleChange} type = 'radio' name='class' value='radical'/>
            <label htmlFor='entry'>Radical</label>
          </div>
        </div>
        <h2>Show History</h2>
        <input className = 'lg' onChange = {handleChange} autoComplete = 'off' type = 'text' name = "pastShows" placeholder = 'Impalas Magazine Shows Attended'/>
        <input className = 'lg' onChange = {handleChange} autoComplete = 'off' type = 'text' name = "pastAwards" placeholder = 'Previous Awards Won'/>
        <h2>Vehicle Details</h2>
        <div className='input-row'>
          <input 
            name = 'club' 
            autoComplete='off'
            type="text"
            placeholder="Club Affiliation"
            onChange={handleChange}
            />
          <input 
            name = 'nickname' 
            autoComplete='off'
            type="text"
            placeholder="Vehicle Nickname"
            onChange={handleChange}
            />
        </div>
        <div className='input-row'>
          <input 
            name = 'typePaint' 
            autoComplete='off'
            type="text"
            placeholder="Type Paint"
            onChange={handleChange}
            />
          <input 
            name = 'upholstery' 
            autoComplete='off'
            type="text"
            placeholder="Upholstery"
            onChange={handleChange}
            />
        </div>
        <h2>Check the Following to be Displayed</h2>
        <div className='input-row'>
          <div className='display'>
            <input type = 'checkbox' value = {true} onChange = {handleChange} autoComplete = 'off' name = 'trunk'/>
            <label htmlFor = 'trunk'>Trunk</label>
          </div>
          <div className='display'>
            <input type = 'checkbox' value = {true} onChange = {handleChange} autoComplete = 'off' name = 'engine'/>
            <label htmlFor = 'engine'>Engine</label>
          </div>
        </div>
        <div className='input-row'>
          <div className='display'>
            <input type = 'checkbox' value = {true} onChange = {handleChange} autoComplete = 'off' name = 'undercarriage'/>
            <label htmlFor = 'undercarriage'>Undercarriage</label>
          </div>
          <div className='display'>
            <input type = 'checkbox' value = {true} onChange = {handleChange} autoComplete = 'off' name = 'twentyTwenty'/>
            <label htmlFor = 'twentyTwenty'>20x20</label>
          </div>
        </div>
        <h2>Electricity? <span>*An electricity fee may be required depending on the facility</span></h2>
        <div className='input-row'>
          <div className='display'>
            <input type = 'radio' value = "yes" onChange = {handleChange} autoComplete = 'off' name = 'electricity' required/>
            <label htmlFor = 'undercarriage'>Yes</label>
          </div>
          <div className='display'>
            <input type = 'radio' value = "yes" onChange = {handleChange} autoComplete = 'off' name = 'electricity'/>
            <label htmlFor = '20x20'>No</label>
          </div>
        </div>
        <h2>Top Modifications</h2>
        <input className ='lg' type = 'text' name='mods' placeholder='List your top 3 modifications'/>
      </div>
      <div className = 'form-section'>
        <h1>Images</h1>
        <h2>Please Include Two Images of your Vehicle</h2>
        <div encType="multipart/form-data" className='input-row'>
          <input accept="image/png, image/jpeg" onChange = {handleChange} type = 'file' name = 'img1' required/>
          <input accept="image/png, image/jpeg" onChange = {handleChange} type = 'file' name = 'img2' required/>
        </div>
      </div>
      <button className = 'submit'>Submit</button>
    </form>
  )
}



export default VehicleRegistration