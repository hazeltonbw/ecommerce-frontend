import { useState, useEffect } from "react";

type Props = {
  qty: number;
  inCart: boolean;
  buttonAction: Function;
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

    const MIN: number = 1,
      MAX: number = 99;
    setQty(clamp(qty + num, MIN, MAX));
  };
  return (
    <div className="flex-col w-full justify-center items-center ">
      <div className="flex items-center justify-center p-1">
        <button
          id="decrement"
          className="text-white px-6"
          onClick={() => updateQty(-1)}
        >
          -
        </button>
        <span className="text-lg min-w-[3ch] text-center">{qty}</span>
        <button
          id="increment"
          className="text-white px-6"
          onClick={() => updateQty(1)}
        >
          +
        </button>
      </div>
      <button
        className="w-full text-white"
        onClick={(e) => props.buttonAction(qty)}
      >
        {props.inCart ? "Update cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default QuantityPicker;
