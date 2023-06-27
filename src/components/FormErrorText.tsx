import React from "react";
type Props = { error: boolean; message: string };

const FormErrorText = ({ error, message }: Props) => {
  return error ? <div className="text-sm text-red-700">{message}</div> : null;
};
export default FormErrorText;
