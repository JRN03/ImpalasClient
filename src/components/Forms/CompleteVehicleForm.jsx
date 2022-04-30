import { useState } from 'react';
import { Navbar } from '../exports';
import Header from '../../assets/2022.png';
import axios from 'axios';
import { useEffect } from 'react';
import CarLoad from '../Animations/CarLoad';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CompleteVehicleForm = ({data}) => {

  const [shows, setShows] = useState([]);
  const form = data;
  const token = localStorage.getItem("token");
  const [rejection,setRejection] = useState(false);
  const [rejectMessage, setMessage] = useState();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/shows")
    .then(res => {
      setShows(res.data);
    }, rej => {console.log(rej)});
    if(data.img1 && data.img2){
    axios.get(`http://localhost:5000/images/${data.img1}`)
    .then(res => {
      setImg1(res.data)
    }, err => {console.log(err)});
    axios.get(`http://localhost:5000/images/${data.img2}`)
    .then(res => {
      setImg2(res.data)
    }, err => {console.log(err)});}

    if(img1 && img2) {
      setLoaded(true);
      console.log();
    }
  },[data,img1,img2]);

  const accept = (e) => {
    setLoaded(false);
    setRejection(false);
    axios.post("http://localhost:5000/admin/requests/vehicles/accepted", {id:data._id},{
      headers: {
        "auth-token": token
      }
    }).then(res => {
      setLoaded(true);
      toast("Success. Application has been accepted.", {
        draggable: true,
        position: toast.POSITION.TOP_LEFT
      });
    }, rej => {
      setLoaded(true);
      toast("Error. Application could not be accepted. Please refresh and try again", {
        draggable: true,
        position: toast.POSITION.TOP_LEFT
      });
    });
  }
  const reject = (e) => {
    setLoaded(false);
    axios.post("http://localhost:5000/admin/requests/vehicles/denied", {id:data._id,message:rejectMessage},{
      headers: {
        "auth-token": token
      }
    }).then(res => {
      setLoaded(true);
      toast("Success. Application has been rejected.", {
        draggable: true,
        position: toast.POSITION.TOP_LEFT
      });
    }, rej => {
      setLoaded(true);
      toast("Error. The application could not be rejected. Please refresh and try again", {
        draggable: true,
        position: toast.POSITION.TOP_LEFT
      });
    });
  }
  const handleChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  }
  const cancel = (e) => {
    e.preventDefault();
    setRejection(false);
  }
  if(!loaded) return <CarLoad/>
  return (
    <form encType="multipart/form-data" className = "form-page">
      <ToastContainer/>
      <Navbar/>
      <fieldset disabled='disabled'>
      <div className = 'form-section header'>
          <img alt="" src={Header}/>
          <h1>Upcoming Events</h1>
          {shows.map(show => 
            <div className = 'show'>
              {show.description === form.show ? <input name = 'show' type = "radio" value = {show.description} checked required/>:
              <input name = 'show' type = "radio" value = {show.description} required/>}
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
            value={form.fName}
            required
            />
            <input 
            name = 'lName' 
            autoComplete='off'
            type="text"
            placeholder="Last Name*"
            value={form.lName}
            required
            />
        </div>
        <div className = 'input-row'>
            <input 
            name = 'email' 
            autoComplete='off'
            type="email"
            placeholder="Email*"
            value={form.email}
            required
            />
            <input 
            name = 'phone' 
            autoComplete='off'
            type="tel"
            placeholder="Phone Number*"
            value={form.phone}
            required
            />
        </div>
        <div className = 'age-container'>
          <input value = {form.age} className = 'age sm' type = 'number' autoComplete='off' name = 'age' placeholder = "age*" min = '0' required/>
        </div>
        <h2>Address</h2>
        <div className='input-row'>
          <input 
            name = 'address' 
            autoComplete='off'
            type="text"
            placeholder="Address*"
            value={form.address}
            required
            />
          <input 
            name = 'city' 
            autoComplete='off'
            type="text"
            placeholder="city*"
            value={form.city}
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
            value={form.state}
            required
            />
          <input 
            className='sm'
            name = 'zip' 
            autoComplete='off'
            type="number"
            min='0'
            placeholder="Zip*"
            value={form.zip}
            required
            />
        </div>
      </div>
      <div className = 'form-section'>
        <h1>Vehicle Information</h1>
        <h2>Type of Entry*</h2>
        <div className = 'input-row'>
          <div className = 'entry'>
            {form.entry === "Car" ? <input type = 'radio' name='entry' value='Car' checked/>:
                <input type = 'radio' name='entry' value='Car'/>
            }
            <label htmlFor='entry'>Car</label>
          </div>
          <div className = 'entry'>
            {form.entry === "Truck" ? <input type = 'radio' name='entry' value='Truck' checked/>:
                <input type = 'radio' name='entry' value='Truck'/>
            }
            <label htmlFor='entry'>Truck</label>
          </div>
        </div>
        <div className = "input-row">
          <div className = 'entry'>
            {form.entry === "Bike" ? <input type = 'radio' name='entry' value='Bike' checked/>:
                <input type = 'radio' name='entry' value='Car'/>
            }
            <label htmlFor='entry'>Bike</label>
          </div>
        </div>
        <div className = "input-row">
          <input className = 'med' value={form.year} name = "year" type='number' min='0' placeholder='Year*' required/>
          <input className = 'med'  value={form.model} name = "model" type='text' placeholder='Model*' required/>
          <input className = 'med'  value={form.make} name = "make" type='text' placeholder='Make*' required/>
        </div>
        <h2>Classification*</h2>
        <div className = 'input-row'>
          <div className = 'entry'>
            {form.class === "original" ? <input type = 'radio' name='class' value='original' checked/>:
                <input type = 'radio' name='class' value='original'/>
            }
            <label htmlFor='class'>Original</label>
          </div>
          <div className = 'entry'>
            {form.class === "street-custom" ? <input type = 'radio' name='class' value='street-custom' checked/>:
                <input type = 'radio' name='class' value='street-custom'/>
            }
            <label htmlFor='class'>Street Custom</label>
          </div>
        </div>
        <div className = 'input-row'>
          <div className = 'entry'>
             {form.class === "mild-custom" ? <input type = 'radio' name='class' value='mild-custom' checked/>:
                <input type = 'radio' name='class' value='mild-custom'/>
             }
            <label htmlFor='class'>Mild Custom</label>
          </div>
          <div className = 'entry'>
            {form.class === "semi-custom" ? <input type = 'radio' name='class' value='semi-custom' checked/>:
                <input type = 'radio' name='class' value='semi-custom'/>
            }
            <label htmlFor='class'>Semi-Custom</label>
          </div>
        </div>
        <div className = 'input-row'>
          <div className = 'entry'>
            {form.class === "full-custom" ? <input type = 'radio' name='class' value='full-custom' checked/>:
                <input type = 'radio' name='class' value='full-custom'/>
            }
            <label htmlFor='class'>Full Custom</label>
          </div>
          <div className = 'entry'>
            {form.class === "radical" ? <input type = 'radio' name='class' value='radical' checked/>:
                <input type = 'radio' name='class' value='radical'/>
            }
            <label htmlFor='entry'>Radical</label>
          </div>
        </div>
        <h2>Show History</h2>
        <input className = 'lg'  value = {form.pastShows} autoComplete = 'off' type = 'text' name = "pastShows" placeholder = 'Impalas Magazine Shows Attended'/>
        <input className = 'lg'  value = {form.pastAwards} autoComplete = 'off' type = 'text' name = "pastAwards" placeholder = 'Previous Awards Won'/>
        <h2>Vehicle Details</h2>
        <div className='input-row'>
          <input 
            name = 'club' 
            autoComplete='off'
            type="text"
            placeholder="Club Affiliation"
            value={form.club}
            />
          <input 
            name = 'nickname' 
            autoComplete='off'
            type="text"
            placeholder="Vehicle Nickname"
            value={form.nickname}
            />
        </div>
        <div className='input-row'>
          <input 
            name = 'typePaint' 
            autoComplete='off'
            type="text"
            placeholder="Type Paint"
            value={form.typePaint}
            />
          <input 
            name = 'upholstery' 
            autoComplete='off'
            type="text"
            placeholder="Upholstery"
            value={form.upholstery}
            />
        </div>
        <h2>Check the Following to be Displayed</h2>
        <div className='input-row'>
          <div className='display'>
            <input type = 'checkbox' value = {true}  autoComplete = 'off' name = 'trunk' checked={form.trunk ? "checked" : ""}/>
            <label htmlFor = 'trunk'>Trunk</label>
          </div>
          <div className='display'>
            <input type = 'checkbox' value = {true}  autoComplete = 'off' name = 'engine' checked={form.engine ? "checked" : ""}/>
            <label htmlFor = 'engine'>Engine</label>
          </div>
        </div>
        <div className='input-row'>
          <div className='display'>
            <input type = 'checkbox' value = {true}  autoComplete = 'off' name = 'undercarriage' checked={form.undercarriage ? "checked" : ""}/>
            <label htmlFor = 'undercarriage'>Undercarriage</label>
          </div>
          <div className='display'>
            <input type = 'checkbox' value = {true}  autoComplete = 'off' name = 'twentyTwenty' checked={form.twentyTwenty ? "checked" : ""}/>
            <label htmlFor = 'twentyTwenty'>20x20</label>
          </div>
        </div>
        <h2>Electricity? <span>*An electricity fee may be required depending on the facility</span></h2>
        <div className='input-row'>
          <div className='display'>
            <input type = 'radio' value = "yes"  autoComplete = 'off' name = 'electricity' checked={form.electricity === "yes" ? "checked" : ""} required/>
            <label htmlFor = 'electricity'>Yes</label>
          </div>
          <div className='display'>
            <input type = 'radio' value = "yes"  autoComplete = 'off' name = 'electricity' checked={form.electricity !== "yes" ? "checked" : ""}/>
            <label htmlFor = 'electricity'>No</label>
          </div>
        </div>
        <h2>Top Modifications</h2>
        <input className ='lg' value = {form.mods} type = 'text' name='mods' placeholder='List your top 3 modifications'/>
      </div>
      <div className = 'form-section'>
        <h1>Images</h1>
        <h2>Please Include Two Images of your Vehicle</h2>
        <div className='submitted-images-container'>
          <img src={`data:image/jpeg;base64,${img1}`} alt = ""/>
          <img src={`data:image/jpeg;base64,${img2}`} alt = ""/>
        </div>
      </div>
      </fieldset>
      {rejection ? (<div className='form-section'>
          <h1>Reason For Rejection</h1>
          <input onChange = {handleChange} className = "lg" type = "text" name = "reason" placeholder='Reason for rejection' required/>
          <div className='actions'>
            <button onClick = {reject} className='accept'>Submit</button>
            <button onClick = {cancel} className='reject'>Cancel</button>
          </div>
      </div>): (
        <div className='actions'>
          <button onClick = {accept} className='accept'>Accept</button>
          <button onClick = {() => {setRejection(true)}} className='reject'>Reject</button>
        </div>
      )}
    </form>
  )
}



export default CompleteVehicleForm