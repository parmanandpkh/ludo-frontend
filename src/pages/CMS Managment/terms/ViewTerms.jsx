import React from 'react'
import CommonListPage from 'src/components/commonCmsPages/privacy/list'

const ViewTerms = () => {
    return (
        <>
            <CommonListPage
                slugname={'terms'}
                title={"Terms & Conditions"}
                btnName={"Edit Terms"}
                btnRedirectUrl={"/cms/terms-conditions/edit"}
            />
        </>
    )
}

export default ViewTerms