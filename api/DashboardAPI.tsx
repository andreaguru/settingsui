export async function getIntegratedClientList() {
    try {
        const response = await Promise.all([
            fetch("http://localhost:3004/clients"),
            fetch("http://localhost:3004/clientsCMS"),
        ]);

        // return two arrays with the data from the two fetch requests
        const clientsPromise = await Promise.all(response.map(resp => resp.json()))

        // merge the info from CMS to the Detail API where id is the same
        const clientsArray = clientsPromise[0].map((client: any) => {
            return {...client, ...clientsPromise[1].find((clientCMS: any) => clientCMS.id === client.id)}
        })

        // filter the result in order to show only clients that have a name
        return clientsArray.filter((client: any) => client.name)

    } catch {
        throw Error("Promise failed");
    }
}