export async function getClientsList() {
    try {
        const response = await fetch(`http://localhost:3004/clients`)
        return response.json()
    } catch (error) {
        const message = `An error has occured: ${error}`;
        throw new Error(message);
    }
}

export const getCMSClientsList = () => {

    var credentials = btoa("idadmin:kW8s2907");
    var auth = {"Authorization": `Basic ${credentials}`};

    return fetch(`https://api-cpp.staging.ippen.space/v0/cms/clients?system=production`, {
        headers: auth
    })
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error("Error:", error)
            console.log("server is down!!")
        })
}
