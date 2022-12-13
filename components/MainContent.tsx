import {Card, CardContent, Typography} from "@mui/material";
import {Clients} from "../types/api.types";
import {MainContentProps} from "../types/componentProps.types";

/**
 * MainContent component. It accepts 2 parameters:
 * clientsList: the complete list of the clients
 * filteredClientsList: the filtered list of the clients. This value is set through setFilteredClients, in index.js
 *
 * @constructor
 */
function MainContent({clientsList, filteredClientsList}: MainContentProps) {
    const shownClients = filteredClientsList.length ? filteredClientsList : clientsList;

    return (
        <>
            {shownClients.map((client: Clients, index: number) => (
                <Card key={index}>
                    <CardContent>
                        <Typography color="text.secondary" gutterBottom>
                            test
                        </Typography>
                        <Typography variant="h5" component="div">
                            {client.name}
                        </Typography>
                        <Typography variant="body2">
                            test body2 style
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}

export default MainContent;
