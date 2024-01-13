import React from 'react'
import CommonListPage from 'src/components/commonCmsPages/privacy/list';


const ViewPrivacy = () => {
    return (
        <>
            <CommonListPage
                slugname={'privacy-policy'}
                title={"Privacy Policy"}
                btnName={"Edit Privacy"}
                btnRedirectUrl={"/cms/privacy-policy/edit"}
            />

        </>
    )
}

export default ViewPrivacy