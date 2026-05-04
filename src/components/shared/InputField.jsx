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
    placeholder,
    readOnly,
}) => {
    return (
        <div className="flex w-full flex-col gap-1 font-notosans">
            <label
                htmlFor={id}
                className={`${className ? className : ""} text-sm font-semibold text-slate-800`}
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`rounded-md border px-3 py-2 text-slate-800 outline-none ${
                    readOnly ? "bg-gray-100" : "bg-transparent"
                } ${errors[id]?.message ? "border-red-500" : "border-slate-300"} ${className ? className : ""}`}
                readOnly={readOnly}
                {...register(id, {
                    required: { value: required, message },
                    minLength: min
                        ? { value: min, message: `최소 ${min}자 이상 입력해 주세요.` }
                        : undefined,
                    pattern:
                        type === "email"
                            ? {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "이메일 형식이 올바르지 않습니다.",
                            }
                            : type === "url"
                                ? {
                                    value: /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                                    message: "URL 형식이 올바르지 않습니다.",
                                }
                                : undefined,
                })}
            />

            {errors[id]?.message && (
                <p className="mt-0 text-sm font-semibold text-red-600">
                    {errors[id]?.message}
                </p>
            )}
        </div>
    );
};

export default InputField;
