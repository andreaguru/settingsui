import {Card, CardContent, Typography} from "@mui/material";
import {ClientsInterface} from "../types/settings.types";

interface MainContentProps {
   clientsList: ClientsInterface[];
   filteredClientsList: ClientsInterface[];
}

/**
 *
 * @constructor
 */
function MainContent({clientsList, filteredClientsList}: MainContentProps) {
    const shownClients = filteredClientsList.length ? filteredClientsList : clientsList;

    return (
        <>
            {shownClients.map((client: ClientsInterface, index: number) => (
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
