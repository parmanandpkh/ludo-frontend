export default CardLayout = ({title,children})=>{
    return(
        <Container>
            <Card>
               <CardHeader title={<BackButton text={title} variant="h6" />} />
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Container>
    )
}