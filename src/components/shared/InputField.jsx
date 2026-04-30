const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
    readOnly
}) => {
    return (
        <div className="flex flex-col gap-1 w-full font-notosans">
            <label
                htmlFor={id}
                className={`${
                    className ? className : ""
                } font-semibold text-sm text-slate-800`}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`px-2 py-2 border outline-none text-slate-800 rounded-md
                    ${readOnly ? "bg-gray-100" : "bg-transparent"} 
                    ${errors[id]?.message ? "border-red-500" : "border-slate-700"} 
                    ${className ? className : ""}
                `}
                readOnly={readOnly}
                {...register(id, {
                    required: {value: required, message},
                    minLength: min
                        ? { value: min, message: `최소 ${min}자 이상 입력해주세요. `}
                        : null,
                    pattern:
                        type === "email"
                            ? {
                                value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                                message: "이메일 형식에 부합하지 않습니다."
                            }
                            : type === "url"
                            ? {
                                value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                message: "URL 형식에 부합하지 않습니다."
                            }
                            : null,

                })}
                />

                {errors[id]?.message && (
                    <p className="text-sm font-semibold text-red-600 mt-0">
                        {errors[id]?.message}
                    </p>
                )}
        </div>
    );
};

export default InputField;