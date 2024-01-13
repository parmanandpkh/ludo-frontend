import React from 'react'
import CommonEditPage from 'src/components/commonCmsPages/privacy/edit'

const Terms = () => {
    return (
        <>
            <CommonEditPage
                navigateUrl={"/cms/terms-conditions"}
                title={"Edit Terms"}
                slugname={"terms"}
            />
        </>
    )
}

export default Terms