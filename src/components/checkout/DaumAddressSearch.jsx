import React from 'react';
import DaumPostcode from 'react-daum-postcode';

const DaumAddressSearch = ({ onComplete }) => {
    const handleComplete = (data) => {
        const fullAddress = data.address;
        const extraAddress = data.addressType === 'R' ? data.bname || '' : '';
        const zoneCode = data.zonecode;

        const parsed = {
            addressName: fullAddress,
            postalCode: zoneCode,
            roadNameAddress: data.roadAddress,
            jibunAddress: data.jibunAddress,
            region1DepthName: data.sido,
            region2DepthName: data.sigungu,
            region3DepthName: data.bname,
        };

        onComplete(parsed);
    };

    return <DaumPostcode onComplete={handleComplete} />;
};

export default DaumAddressSearch;
