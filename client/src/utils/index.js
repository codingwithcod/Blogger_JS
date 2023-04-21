

export const CreateOrGetUser =  async(data, addUser) => {

  const response = await fetch('http://localhost:4000/api/user/signin', {
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(data)
  })

  await response.json();
  addUser(data)


    
}