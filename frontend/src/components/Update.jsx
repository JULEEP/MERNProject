import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const [name, setName] = useState("")
     const [email, setEmail] = useState("")
     const [age, setAge] = useState(0)
     const [error, setError] = useState("")
     const { id } = useParams()

     const navigate = useNavigate();

     const getSingleData = async() => {

        const response = await fetch(`http://localhost:4000/api/user/${id}`)

        const result = await response.json();

        if(!response.ok){
            console.log(result.error);
            setError(result.error)

        }
        if(response.ok){
            setError("")
            console.log("updated user", result);
            setName(result.name)
            setEmail(result.email)
            setAge(result.age)


        }
     }

     const handleUpdate = async(e) => {
        e.preventDefault();
        const updateUser = {name, email, age};
        console.log(updateUser)
        const response = await fetch(`http://localhost:4000/api/user/${id}`, {
            method:"PATCH",
            headers:{
                "Content-Type":'application/json',
            },
            body:JSON.stringify(updateUser),
        })
        const result = await response.json()
        if(!response.ok){
           console.log(response.error);
           setError(response.error)
        }
        if(response.ok){
            setError("")
            console.log("updated user", result);
            navigate("/all")


        }

     }

     useEffect(() => {
      getSingleData()
     }, [])
     


  return (
    <div className='container my-2'>
    <h1 className='h1 text-center'>Edit Data</h1>
    {error && <div class="alert alert-danger"> {error} </div>}
    <form className='form' onSubmit={handleUpdate}>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input
       type="text"
        className="form-control"
         value={name} 
         onChange={(e) => setName(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Email</label>
      <input
       type="email"
        className="form-control"
         value={email} 
         onChange={(e) => setEmail(e.target.value)}/>
    </div>
    <div className="mb-3">
      <label className="form-label">Age</label>
      <input 
      type="number"
       className="form-control"
        value={age}
         onChange={(e) => setAge(e.target.value)} />
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
  </form>

    </div>
  )
}

export default Update