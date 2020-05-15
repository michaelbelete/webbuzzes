import axios from "axios"

axios.get("https://api.ipify.org?format=json").then((response) => {
  const ip = response.data.ip
})

export  ip
