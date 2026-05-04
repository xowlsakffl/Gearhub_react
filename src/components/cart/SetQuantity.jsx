const buttonStyles =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";

const SetQuantity = ({
    quantity,
    cardCounter,
    handeQtyIncrease,
    handleQtyDecrease,
}) => {
    return (
        <div className="flex items-center gap-4">
            {cardCounter ? null : <div className="font-semibold text-slate-700">수량</div>}
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-2 py-2">
                <button
                    disabled={quantity <= 1}
                    className={buttonStyles}
                    onClick={handleQtyDecrease}
                >
                    -
                </button>
                <div className="min-w-[22px] text-center text-sm font-semibold text-slate-900">{quantity}</div>
                <button
                    className={buttonStyles}
                    onClick={handeQtyIncrease}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default SetQuantity;
