import {ComponentProps} from "react";

type Props = ComponentProps<"input">;
export default function Input({
                                  ...otherProps
                              }: Props) {
    return (
        <input
            type="text"
            className="w-full p-2 border rounded mb-4"
            {...otherProps}
        />
    )
}