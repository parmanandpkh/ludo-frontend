import { CardHeader, Container, Card ,CardContent} from '@mui/material';
import BackButton from "../components/Buttons/BackButton";
import { makeStyles } from '@material-ui/core';

export default function CardLayout ({title,children , noBackButton}){


    return(
        <Container>
            <Card>
               {!noBackButton ? <CardHeader title={<BackButton text={title} variant="h6" />}  /> : ""}
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Container>
    )
}