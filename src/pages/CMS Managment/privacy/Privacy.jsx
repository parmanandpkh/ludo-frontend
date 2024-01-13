import React from 'react'
import CommonEditPage from 'src/components/commonCmsPages/privacy/edit';


const Privacy = () => {
    return (
        <>
            <CommonEditPage
                navigateUrl={"/cms/privacy-policy"}
                title={"Edit Privacy"}
                slugname={"privacy-policy"}
            />
           

        </>
    )
}

export default Privacy