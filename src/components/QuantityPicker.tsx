import React, { useState } from "react";

type Props = {
  qty: number;
  inCart: boolean;
  // Function type in TypeScript
  buttonAction: (qty: number) => void;
};

const QuantityPicker = (props: Props) => {
  const [qty, setQty] = useState(props.qty);

  //   useEffect(() => {
  //     if (props.qty) {
  //       setQty(props.qty);
  //     }
  //   }, []);

  const updateQty = (num: number) => {
    // clamp number between MIN and MAX
    const clamp = (num: number, min: number, max: number) =>
      Math.min(Math.max(num, min), max);

    const MIN = 1,
      MAX = 99;
    setQty(clamp(qty + num, MIN, MAX));
  };
  return (
    <div className="w-full flex-col items-center justify-center ">
      <div className="flex items-center justify-center p-1">
        <button
          id="decrement"
          className="px-6 text-white"
          onClick={() => updateQty(-1)}
        >
          -
        </button>
        <span className="min-w-[3ch] text-center text-lg">{qty}</span>
        <button
          id="increment"
          className="px-6 text-white"
          onClick={() => updateQty(1)}
        >
          +
        </button>
      </div>
      <button
        className="w-full text-white"
        onClick={() => props.buttonAction(qty)}
      >
        {props.inCart ? "Update cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default QuantityPicker;
