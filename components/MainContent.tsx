import {Card, CardContent, Typography} from "@mui/material"
import {useContext} from "react"
import {ClientsContext, FilteredClientsContext} from "../context/AppContext"

function MainContent() {
    const clientsList = useContext(ClientsContext)
    const filteredClientsList = useContext(FilteredClientsContext)

    const shownClients = filteredClientsList.length ? filteredClientsList : clientsList

    return (
        <>
            {shownClients.map((client: any, index: number) => (
                <Card key={index} sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="div">
                            be
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br/>
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    )
}

export default MainContent
