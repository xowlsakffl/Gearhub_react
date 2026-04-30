import React, { useEffect, useState } from 'react'
import InputField from '../shared/InputField'
import { useForm } from 'react-hook-form';
import { FaAddressCard, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../shared/Spinners';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';
import DaumAddressSearch from './DaumAddressSearch';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const [showAddressSearch, setShowAddressSearch] = useState(false);
    
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: {errors},
        } = useForm({
            mode: "onTouched",
        });

        const handleAddressSelect = (data) => {
            console.log(data);
            setValue("addressName", data.addressName);
            setValue("postalCode", data.postalCode);
            setValue("roadNameAddress", data.roadNameAddress);
            setValue("jibunAddress", data.jibunAddress);
            setValue("region1DepthName", data.region1DepthName);
            setValue("region2DepthName", data.region2DepthName);
            setValue("region3DepthName", data.region3DepthName);
            setValue("buildingName", data.buildingName || "");
            setShowAddressSearch(false);
        };

        const onSaveAddressHandler = async (data) => {
            dispatch(addUpdateUserAddress(
                data,
                toast,
                address?.addressId,
                setOpenAddressModal
            ));
        };

        useEffect(() => {
            if (address?.addressId) {
                setValue("title", address?.title);
                setValue("recipient", address?.recipient);
                setValue("recipientNumber", address?.recipientNumber);
                setValue("addressName", address?.addressName);
                setValue("roadNameAddress", address?.roadNameAddress);
                setValue("jibunAddress", address?.jibunAddress);
                setValue("postalCode", address?.postalCode);
                setValue("latitude", address?.latitude);
                setValue("longitude", address?.longitude);
                setValue("buildingName", address?.buildingName);
                setValue("region1DepthName", address?.region1DepthName);
                setValue("region2DepthName", address?.region2DepthName);
                setValue("region3DepthName", address?.region3DepthName);
            }
        }, [address]);

  return (
    <div className="font-notosans">
            <form
                onSubmit={handleSubmit(onSaveAddressHandler)}
                className="">
                    <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
                        <FaAddressCard className="mr-2 text-2xl"/>
                        {!address?.addressId ? 
                        "배송지 추가" :
                        "배송지 수정"
                        }
                        
                    </div>
            <div className="flex flex-col gap-4">
                <InputField
                    label="배송지명"
                    required
                    id="title"
                    type="text"
                    message="*배송지명은 필수입니다"
                    placeholder="예) 우리집, 회사 등"
                    register={register}
                    errors={errors}
                />

                <InputField
                    label="받는 사람"
                    required
                    id="recipient"
                    type="text"
                    message="*받는 사람은 필수입니다"
                    register={register}
                    errors={errors}
                />

                <InputField
                    label="전화번호"
                    required
                    id="recipientNumber"
                    type="text"
                    message="*전화번호는 필수입니다"
                    register={register}
                    errors={errors}
                />

                <div className="flex gap-2 items-center">
                    <div className="flex-1">
                    <InputField
                        label="전체 주소"
                        required
                        id="addressName"
                        type="text"
                        message="*전체 주소는 필수입니다"
                        register={register}
                        errors={errors}
                        readOnly  
                    />
                    </div>
                    <button
                    type="button"
                    onClick={() => setShowAddressSearch(true)}
                    className="h-10 mt-6 px-3 py-1 bg-blue-600 text-white rounded text-sm whitespace-nowrap"
                    >
                    주소 검색
                    </button>
                </div>


                {showAddressSearch && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md relative w-[400px] max-w-full max-h-[90vh] overflow-auto">
                        <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10"
                        onClick={() => setShowAddressSearch(false)}
                        >
                        <FaTimes className='text-slate-700' size={25} />
                        </button>
                        <DaumAddressSearch onComplete={handleAddressSelect} />
                    </div>
                    </div>
                )}

                <InputField
                    label="우편번호"
                    required
                    id="postalCode"
                    type="text"
                    register={register}
                    errors={errors}
                    readOnly  
                />

                <InputField
                    label="상세주소"
                    required
                    id="buildingName"
                    type="text"
                    message="*상세주소는 필수입니다"
                    placeholder="예) OO아파트 101동"
                    register={register}
                    errors={errors}
                />  

                <input type="hidden" {...register("roadNameAddress")} />
                <input type="hidden" {...register("jibunAddress")} />
                <input type="hidden" {...register("region1DepthName")} />
                <input type="hidden" {...register("region2DepthName")} />
                <input type="hidden" {...register("region3DepthName")} />
            </div>

            <button
                disabled={btnLoader}
                className="w-full text-white bg-customBlue px-4 py-2 rounded-md mt-4"
                type="submit">
                {btnLoader ? (
                    <>
                    <Spinners /> 로딩중..
                    </>
                ) : (
                    <>저장</>
                )}
            </button>
            </form>
        </div>
  )
}

export default AddAddressForm