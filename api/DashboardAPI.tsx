export const getClientsList = () => {
  return fetch(`http://localhost:3004/clients`)
    .then((res) => res.json())
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error("Error:", error)
      console.log("server is down!!")
    })
}
